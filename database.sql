
create TABLE projects(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description TEXT,
    img VARCHAR(255),
    data VARCHAR(255),
    documents JSON
);

create TABLE news(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    img VARCHAR(255),
    date VARCHAR(255)
);

create TABLE us(
    id SERIAL PRIMARY KEY,
    date VARCHAR(255),
    benefactor VARCHAR(255),
    objective VARCHAR(255),
    amount VARCHAR(255)
);

create TABLE we(
    id SERIAL PRIMARY KEY,
    date VARCHAR(255),
    beneficiary VARCHAR(255),
    objective VARCHAR(255),
    amount VARCHAR(255)
);