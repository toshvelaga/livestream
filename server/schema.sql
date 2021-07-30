CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_email character varying(255) NOT NULL UNIQUE,
    user_code integer,
    user_date_created timestamp without time zone,
    user_last_login timestamp without time zone,
    user_active boolean DEFAULT false
);
