
    create sequence transactions_SEQ start with 1 increment by 50;

    CREATE TYPE type AS ENUM ('INVOICE', 'EXPENSE', 'PAYMENT');

    create table transactions (
        id bigint not null,
        account_id bigint,
        amount decimal,
        date date,
        description char(256),
        type type,
        primary key (id)
    );
