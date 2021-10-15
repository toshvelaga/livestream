CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_email character varying(255) NOT NULL UNIQUE,
    user_code integer,
    user_date_created timestamp without time zone,
    user_last_login timestamp without time zone,
    user_active boolean DEFAULT false
);

CREATE TABLE destinations (
    twitch_stream_key character varying(255),
    youtube_stream_key character varying(255),
    facebook_stream_key character varying(255),
    user_id uuid UNIQUE REFERENCES users(user_id)
);

CREATE TABLE broadcasts (
    youtube_title character varying(255),
    youtube_description text,
    youtube_privacy_policy character varying(255),
    broadcast_time_created timestamp without time zone,
    user_id uuid UNIQUE REFERENCES users(user_id),
    broadcast_id character varying(255),
    stream_id character varying(255),
    youtube_destination_url character varying(255)
);