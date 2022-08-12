
create TABLE projects(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description TEXT,
    img VARCHAR(255),
    data VARCHAR(255),
    documents JSON,
    date_create timestamp default CURRENT_TIMESTAMP
);

create TABLE news(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    img VARCHAR(255),
    date VARCHAR(255),
    date_create timestamp default CURRENT_TIMESTAMP
);

create TABLE us(
    id SERIAL PRIMARY KEY,
    date VARCHAR(255),
    benefactor VARCHAR(255),
    objective VARCHAR(255),
    amount VARCHAR(255),
    date_create timestamp default CURRENT_TIMESTAMP
);

create TABLE we(
    id SERIAL PRIMARY KEY,
    date VARCHAR(255),
    beneficiary VARCHAR(255),
    objective VARCHAR(255),
    amount VARCHAR(255),
    date_create timestamp default CURRENT_TIMESTAMP
);

create TABLE help(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    documents JSON,
    date_create timestamp default CURRENT_TIMESTAMP
);

create TABLE video(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(600),
    link VARCHAR(255),
    date_create timestamp default CURRENT_TIMESTAMP
);