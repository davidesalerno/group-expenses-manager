# Pull Request Review: OpenShift Docs PR #102604

**PR Title:** OSDOCS-17251: Added rollout statements to cert-manager-certificate-in…

**PR Link:** https://github.com/openshift/openshift-docs/pull/102604

**Status:** Open | **Assignee:** @davidesalerno | **Author:** @dfitzmau

---

## Summary

This PR addresses JIRA issue OSDOCS-17251 and updates OpenShift documentation related to creating certificates for the Ingress Controller and replacing default ingress certificates. The changes add important clarifications about Ingress Controller behavior when certificates are renamed or renewed.

**Files Changed:**
1. `modules/cert-manager-certificate-ingress.adoc` (+46/-18)
2. `modules/customize-certificates-replace-default-router.adoc` (+20/-12)

---

## Overall Assessment

**Status:** ✅ **Good progress with minor suggestions**

The PR has been well-received and most of the review feedback from @davidesalerno has been addressed. The changes improve documentation clarity and add useful verification steps. However, there are a few areas that could benefit from additional refinement.

---

## Detailed Review

### 1. **Content Improvements** ✅

#### Strengths:
- **Added introductory context**: The new opening sentence helps readers understand the purpose of creating certificates for the Ingress Controller.
- **Important behavioral note**: The NOTE section clarifying Ingress Controller behaviors regarding secret renaming and automatic certificate renewal is valuable and addresses a common point of confusion.
- **Enhanced verification steps**: Adding three distinct verification commands (checking certificate status, secret content, and ingress controller configuration) significantly improves the user experience.
- **Improved formatting**: Switching from numbered callouts to definition lists makes the documentation more readable and maintainable.

### 2. **Grammar and Style Issues** ⚠️

#### Issue #1: Grammatical Error in Introduction
**Location:** `cert-manager-certificate-ingress.adoc`, line 9

**Current:**
```
You can create a certificate for the Ingress Controller so to enable HTTPs traffic for your applications.
```

**Issue:** The phrase "so to enable" is grammatically incorrect.

**Suggested Fix:**
```
You can create a certificate for the Ingress Controller to enable HTTPS traffic for your applications.
```

**Additional Notes:**
- Correct "HTTPs" to "HTTPS" (proper capitalization for the abbreviation)
- Remove the redundant "so"

---

#### Issue #2: Clarity in NOTE Section
**Location:** `cert-manager-certificate-ingress.adoc`, NOTE section

**Current:**
```
* If you rename a secret after the creation of an ingress certificate, the Ingress Controller automatically reloads its configuration to use the ingress certificate.
```

**Observation:** While grammatically correct, this could be slightly clearer about what specifically triggers the reload.

**Suggested Enhancement:**
```
* When you rename a secret containing an ingress certificate, the Ingress Controller automatically reloads its configuration to use the certificate from the renamed secret.
```

---

### 3. **Technical Accuracy** ✅

#### Strengths:
- The explanation of secret renaming vs. updating behavior is now clearer after addressing @davidesalerno's feedback.
- The IMPORTANT section correctly explains that renaming triggers reloading while content updates don't trigger rolling updates due to kubelet's automatic propagation.
- The verification commands are appropriate and useful.

#### Observation:
**Location:** `cert-manager-certificate-ingress.adoc`, verification section

The third verification command uses `grep` with pipe:
```bash
$ oc get ingresscontroller default -n openshift-ingress-operator -o yaml | grep -A2 defaultCertificate
```

**Note:** This is functional but consider whether OpenShift documentation style guide prefers using `-o jsonpath` or `-o json | jq` for more precise field extraction. However, `grep` is simpler for readers unfamiliar with jq, so this may be intentional and acceptable.

---

### 4. **AsciiDoc Formatting** ✅

#### Strengths:
- Properly escaped the asterisk wildcard in DNS names: `"\*.apps.<cluster_base_domain>"`
- Removed extra spaces in source blocks: `[source,yaml]` and `[source,terminal]` (no space after comma)
- Correctly used definition lists for parameter explanations
- Proper list continuation markers (+)

#### Minor Observation:
The backslash escape for the asterisk (`"\*.apps.<cluster_base_domain>"`) is correct for AsciiDoc. @dfitzmau correctly explained this in review comments.

---

### 5. **Parameter Documentation** ⚠️

**Issue:** Duplicate parameter label

**Location:** `cert-manager-certificate-ingress.adoc`, parameter definitions

**Current:**
```
`<tls_cert>`:: Provide a name for the certificate.
`<cluster_base_domain>`:: Specify the common name (CN).
`<secret_name>`:: Specify the name of the secret to create that contains the certificate.
`<cluster_base_domain>`:: Specify the DNS name of the ingress.
`<issuer_name>`:: Specify the name of the issuer.
```

**Issue:** `<cluster_base_domain>` appears twice with different descriptions. This is confusing.

**Suggested Fix:**
```
`<tls_cert>`:: Provide a name for the certificate.
`<cluster_base_domain>`:: Specify the base domain for your cluster (used in both the common name and DNS names).
`<secret_name>`:: Specify the name of the secret to create that contains the certificate.
`<issuer_name>`:: Specify the name of the issuer.
```

Or alternatively, if you want to keep them separate:
```
`<tls_cert>`:: Provide a name for the certificate.
`<cluster_base_domain>` (commonName):: Specify the common name (CN) using your cluster's base domain.
`<secret_name>`:: Specify the name of the secret to create that contains the certificate.
`<cluster_base_domain>` (dnsNames):: Specify the DNS names for the ingress using your cluster's base domain.
`<issuer_name>`:: Specify the name of the issuer.
```

---

### 6. **Consistency Across Files** ✅

Both modified files now use consistent formatting:
- Definition lists instead of numbered callouts
- Proper line continuations with backslashes
- "where:" introduction for parameter explanations

Good consistency maintained!

---

### 7. **Review Comments Status** ✅

@davidesalerno's review comments have been addressed:
- ✅ Typos fixed (certificate, renewal)
- ✅ Ambiguous text about renaming vs. updating clarified with bullet points
- ✅ Backslash escape explained (valid AsciiDoc syntax)
- ✅ "Optional" step concern addressed
- ✅ Additional verification commands added
- ✅ Conflation of renaming vs. updating contents resolved

All marked with ✔️ by @dfitzmau.

---

## Recommendations

### High Priority
1. **Fix grammatical error**: Change "so to enable HTTPs" → "to enable HTTPS" (remove "so" and correct capitalization)
2. **Resolve duplicate parameter**: Clarify the two uses of `<cluster_base_domain>` in parameter descriptions

### Medium Priority
3. **Consider minor clarity improvements**: Enhance the wording in the NOTE section bullet points for better flow
4. **Verify consistency with style guide**: Confirm that the verification commands align with OpenShift documentation standards (particularly the grep usage)

### Low Priority
5. **Add example output**: Consider adding example output snippets for verification commands to help users confirm they're seeing expected results

---

## Additional Context

### PR Metadata
- **JIRA:** OSDOCS-17251
- **Versions:** 4.14+
- **Branches:** enterprise-4.14 through enterprise-4.21
- **CI Status:** All tests passed ✅
- **Doc Preview:** Available via Netlify

### Review Process
- SME approval pending from Network edge engineers/Yuedong Wu
- QE approval pending
- Network edge review requested on Slack

---

## Conclusion

This is a **solid PR** that meaningfully improves the OpenShift documentation. The changes address real user confusion about certificate management and Ingress Controller behavior. With the minor corrections suggested above (particularly the grammatical fix and parameter clarification), this PR will be ready for merge.

**Recommendation:** Address the high-priority issues, then this PR should be good to approve. Great work on incorporating the review feedback! 👍

---

## For Reviewers

**Action Items:**
- [ ] Verify grammatical corrections
- [ ] Confirm parameter documentation clarity
- [ ] Validate verification commands work as expected
- [ ] Check alignment with OpenShift docs style guide
- [ ] Obtain SME approval
- [ ] Obtain QE approval

**Estimated Effort:** ~15-30 minutes to apply suggested fixes

---

**Review conducted on:** 2025-12-18  
**Reviewer:** GitHub Copilot Agent  
**Review requested by:** @davidesalerno
