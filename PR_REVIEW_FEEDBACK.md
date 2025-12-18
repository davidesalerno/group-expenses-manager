# Pull Request Review - PR #21: Fix GH Action to push container images

## Overview
This PR introduces a comprehensive Group Expenses Manager application with microservices architecture (Quarkus-based APIs) and a React-based UI, along with GitHub Actions for CI/CD.

## 🎯 Summary
Overall, this is a solid foundation for the project with good architecture choices. However, there are several security concerns, potential bugs, and areas for improvement that should be addressed.

---

## 🔴 Critical Issues

### 1. **Security: Exposed Secret Token in Workflow**
**File:** `.github/workflows/api-merge.yml` (Line 28)

**Issue:** The workflow uses a custom secret `DS_GITHUB_TOKEN` instead of the built-in `GITHUB_TOKEN`.

```yaml
run: echo "${{ secrets.DS_GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
```

**Risk:** 
- Personal Access Tokens (PATs) have broader permissions than necessary
- If the PAT is compromised, it could affect multiple repositories
- PATs don't automatically expire like GITHUB_TOKEN

**Recommendation:**
```yaml
run: echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
```

Update line 29 as well:
```yaml
-Dquarkus.container-image.password=${{ secrets.GITHUB_TOKEN }}
```

**Benefit:** `GITHUB_TOKEN` is automatically provided by GitHub, scoped to the repository, and expires after the workflow run.

---

### 2. **Infinite Loop in React useEffect**
**File:** `ui/transaction/src/App.jsx` (Lines 12-15)

**Issue:** The `useEffect` hook calls `fetchTransactions()` without a dependency array, causing it to run on every render.

```javascript
useEffect(() => {
  fetchTransactions();
});
```

**Risk:** This creates an infinite loop:
1. Component renders
2. `useEffect` runs → calls `fetchTransactions()`
3. `setTransactions()` updates state
4. State update triggers re-render
5. Go to step 2 (infinite loop)

**Recommendation:**
```javascript
useEffect(() => {
  fetchTransactions();
}, []); // Empty dependency array - run only once on mount
```

**Impact:** Without this fix, the app will make continuous API requests, potentially overwhelming the backend and causing performance issues.

---

## 🟡 High Priority Issues

### 3. **Typo in Variable Name (Consistency)**
**File:** `api/transaction/src/main/java/net/davidesalerno/gem/transaction/service/TransactionService.java` (Line 26)

**Issue:** Variable named `trasactionMapper` instead of `transactionMapper` (missing 'n').

```java
@Inject
TransactionMapper trasactionMapper;
```

**Recommendation:** Rename to `transactionMapper` for consistency and clarity. While this works, it makes the code harder to maintain and looks unprofessional.

---

### 4. **Missing Error Handling in UI**
**File:** `ui/transaction/src/App.jsx`

**Issue:** Error handling only logs to console - no user feedback.

```javascript
catch (error) {
  console.error('Error fetching transactions:', error);
}
```

**Recommendation:** Add user-visible error messages:
```javascript
const [error, setError] = useState(null);

// In catch blocks:
catch (error) {
  console.error('Error fetching transactions:', error);
  setError('Failed to fetch transactions. Please try again.');
}

// In JSX:
{error && <div className="alert alert-danger">{error}</div>}
```

---

### 5. **React JSX Attribute Issues**
**File:** `ui/transaction/src/App.jsx` and `ui/transaction/src/components/InputForm.jsx`

**Issue:** Using `class` instead of `className` in JSX (React syntax).

```javascript
<header class="d-flex flex-wrap...">  // Should be className
<div class="col-md-4 order-md-1">     // Should be className
```

**Recommendation:** Replace all instances of `class` with `className`:
```javascript
<header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
```

**Note:** While some browsers may be forgiving, this is incorrect React syntax and may cause issues.

---

### 6. **Duplicate Dependency in Maven POM**
**File:** `api/transaction/pom.xml` (Lines 50-52 and 71-73)

**Issue:** `quarkus-jdbc-postgresql` is declared twice:
```xml
<dependency>
    <groupId>io.quarkus</groupId>
    <artifactId>quarkus-jdbc-postgresql</artifactId>
</dependency>
```

**Recommendation:** Remove one of the duplicate entries. This can cause confusion and potential build issues.

---

## 🟢 Medium Priority Issues

### 7. **Incomplete Dependabot Configuration**
**File:** `.github/dependabot.yml`

**Issue:** Only configures devcontainers updates, missing npm and maven ecosystems.

**Recommendation:** Add configurations for all package managers used:
```yaml
version: 2
updates:
  - package-ecosystem: "devcontainers"
    directory: "/"
    schedule:
      interval: weekly
  
  - package-ecosystem: "maven"
    directory: "/api"
    schedule:
      interval: weekly
  
  - package-ecosystem: "npm"
    directory: "/ui/transaction"
    schedule:
      interval: weekly
```

---

### 8. **Test Organization Issue**
**File:** `api/transaction/src/test/java/net/davidesalerno/gem/transaction/resource/TransactionResourceIT.java` (Line 20)

**Issue:** The test has a TODO comment about splitting:
```java
//TODO Split this test
void shouldCreateListAnDeleteTransactionSuccessfully() {
```

**Recommendation:** Split this integration test into separate test methods:
- `shouldCreateTransaction()`
- `shouldRetrieveTransactionById()`
- `shouldListTransactionsByAccount()`
- `shouldFilterTransactionsByDate()`
- `shouldDeleteTransaction()`

**Benefit:** Better test isolation, easier debugging, clearer test failures.

---

### 9. **Missing Input Validation in UI**
**File:** `ui/transaction/src/components/InputForm.jsx`

**Issue:** No validation before form submission. Users can submit:
- Negative amounts
- Empty descriptions
- Invalid dates
- Invalid transaction types

**Recommendation:** Add form validation:
```javascript
const validateForm = () => {
  if (formData.amount <= 0) {
    alert('Amount must be positive');
    return false;
  }
  if (!formData.description.trim()) {
    alert('Description is required');
    return false;
  }
  // Add more validations
  return true;
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (!validateForm()) return;
  // ... rest of the code
};
```

---

### 10. **Inconsistent Date Handling**
**File:** `ui/transaction/src/App.jsx` (Line 94) and `InputForm.jsx` (Line 21)

**Issue:** Date initialization is inconsistent:
- `App.jsx`: `date: new Date()`
- `InputForm.jsx`: `date: new Date().toISOString().slice(0, 10)`

**Recommendation:** Use consistent date formatting throughout. Consider using a date picker component and ISO 8601 format.

---

### 11. **Type Input Should Be Dropdown**
**File:** `ui/transaction/src/components/InputForm.jsx` (Lines 40-42)

**Issue:** Transaction type is a free text input, but the backend expects specific enum values (EXPENSE, INCOME).

```javascript
<input type="text" name="type" id="type" value={formData.type} onChange={handleInputChange} class="form-control" />
```

**Recommendation:** Use a select dropdown:
```javascript
<select name="type" id="type" value={formData.type} onChange={handleInputChange} className="form-control">
  <option value="">Select Type</option>
  <option value="EXPENSE">Expense</option>
  <option value="INCOME">Income</option>
</select>
```

---

### 12. **Outdated GitHub Actions Versions**
**File:** `.github/workflows/ui-tests.yml`

**Issue:** Using outdated action versions:
- `actions/checkout@v2` (current is v4)
- `actions/setup-node@v2` (current is v4)

**Recommendation:**
```yaml
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
  with:
    node-version: ${{ matrix.node-version }}
```

---

## 💡 Suggestions for Improvement

### 13. **API Error Responses**
**File:** `api/transaction/src/main/java/net/davidesalerno/gem/transaction/resource/TransactionResource.java`

**Observation:** Error handling returns generic INTERNAL_SERVER_ERROR for all failures.

**Suggestion:** Provide more specific error responses:
```java
.onFailure().recoverWithItem(err -> {
    Log.error(err);
    if (err instanceof NotFoundException) {
        return RestResponse.status(RestResponse.Status.NOT_FOUND);
    }
    return RestResponse.status(RestResponse.Status.INTERNAL_SERVER_ERROR);
})
```

---

### 14. **Missing Update Endpoint**
**File:** `api/transaction/src/main/java/net/davidesalerno/gem/transaction/resource/TransactionResource.java`

**Observation:** The UI has an `updateTransaction` function, but the API doesn't have a PUT endpoint.

**Suggestion:** Add an update endpoint:
```java
@PUT
@Path("/{id}")
public Uni<RestResponse<Transaction>> updateTransaction(Long id, Transaction transaction) {
    return transactionService.update(id, transaction);
}
```

---

### 15. **UI State Management**
**File:** `ui/transaction/src/App.jsx`

**Observation:** State management could be improved. Currently mixing transaction list with selected transaction.

**Suggestion:** Consider using a more robust state management solution (Context API or Redux) as the application grows.

---

### 16. **Missing CORS Configuration**
**Observation:** No CORS configuration visible in the API.

**Suggestion:** Add CORS configuration in `application.properties`:
```properties
quarkus.http.cors=true
quarkus.http.cors.origins=http://localhost:5173
quarkus.http.cors.methods=GET,POST,PUT,DELETE
```

---

### 17. **Pagination Not Used in UI**
**File:** `ui/transaction/src/App.jsx`

**Observation:** API returns paginated results, but UI doesn't implement pagination controls.

**Suggestion:** Add pagination controls to navigate through pages of transactions.

---

### 18. **Missing Environment Variable Validation**
**File:** `ui/transaction/src/App.jsx` (Line 8)

**Suggestion:** Add validation for environment variables:
```javascript
const { VITE_API_ENDPOINT } = import.meta.env;
if (!VITE_API_ENDPOINT) {
  console.error('VITE_API_ENDPOINT is not defined');
}
```

---

### 19. **Git Ignore Improvements**
**File:** `.gitignore`

**Suggestion:** Add more specific patterns:
```gitignore
# IDE
/.vscode
/.idea
*.iml

# Mac
.DS_Store

# Environment files
.env
.env.local
.env.production

# UI specific
ui/**/node_modules
ui/**/dist
ui/**/build
```

---

### 20. **Pull Request Template Issue**
**File:** `.github/PULL_REQUEST_TEMPLATE.md` (Line 3)

**Issue:** Template mentions "Condoman project" instead of "Group Expenses Manager".

**Recommendation:** Update the welcome message to reflect the correct project name.

---

## 📋 Testing Recommendations

1. **Add more unit tests** for service layer and repository layer
2. **Add UI component tests** using React Testing Library
3. **Add E2E tests** for critical user flows
4. **Test error scenarios** (network failures, invalid data, etc.)

---

## 🏗️ Architecture Recommendations

1. **API Gateway**: Consider adding an API gateway for routing to different microservices
2. **Authentication**: Plan for authentication/authorization (OAuth, JWT, etc.)
3. **Database Migrations**: Good use of Flyway for transaction service - apply to other services
4. **Monitoring**: Consider adding health checks and metrics endpoints
5. **Documentation**: Add OpenAPI/Swagger documentation (already using `quarkus-smallrye-openapi`)

---

## ✅ What Was Done Well

1. **Microservices Architecture**: Clean separation of concerns with multiple services
2. **Reactive Programming**: Good use of Mutiny for reactive operations
3. **Database Migrations**: Flyway integration for version control
4. **CI/CD Setup**: GitHub Actions for automated testing
5. **Maven Multi-Module**: Well-organized Maven structure
6. **DTO Pattern**: Proper separation between entities and DTOs
7. **Docker Support**: Multiple Dockerfile options for different deployment scenarios

---

## 🎓 Summary of Action Items

### Must Fix (Before Merge):
1. ✅ Fix infinite loop in React useEffect
2. ✅ Replace `DS_GITHUB_TOKEN` with `GITHUB_TOKEN`
3. ✅ Fix `class` to `className` in JSX files
4. ✅ Remove duplicate Maven dependency

### Should Fix (High Priority):
5. ✅ Add error handling in UI with user feedback
6. ✅ Fix typo in `trasactionMapper`
7. ✅ Change type input to dropdown
8. ✅ Add PUT endpoint for transaction updates

### Nice to Have (Medium Priority):
9. ✅ Split large integration test
10. ✅ Update GitHub Actions to latest versions
11. ✅ Expand Dependabot configuration
12. ✅ Add form validation in UI
13. ✅ Fix PR template project name

---

## 🎉 Conclusion

This is a well-structured project with good architectural decisions. The main concerns are:
- **Security issues** with token usage
- **Critical bug** with React infinite loop
- **Several quality issues** that should be addressed

Once these issues are resolved, this will be a solid foundation for the Group Expenses Manager application.

**Recommendation**: Address the critical and high-priority issues before merging. The suggestions and medium-priority items can be tracked as follow-up tasks.
