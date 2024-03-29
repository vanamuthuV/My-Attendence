PGDMP  *    0                |         
   Attendance    16.1    16.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16704 
   Attendance    DATABASE     �   CREATE DATABASE "Attendance" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Attendance";
                postgres    false                        3079    16710 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false                       0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    16735 
   attendance    TABLE     �   CREATE TABLE public.attendance (
    student_id uuid,
    subject_id uuid,
    status character varying(8),
    attendance_time timestamp without time zone,
    attendance_id uuid DEFAULT public.uuid_generate_v4() NOT NULL
);
    DROP TABLE public.attendance;
       public         heap    postgres    false    2            �            1259    16705 
   staffadmin    TABLE     ^   CREATE TABLE public.staffadmin (
    name text,
    admin_username text,
    password text
);
    DROP TABLE public.staffadmin;
       public         heap    postgres    false            �            1259    16721    students    TABLE       CREATE TABLE public.students (
    student_name character varying(30),
    course text,
    usn character varying(20),
    gender character(1),
    student_section character(1),
    student_year character(1),
    student_id uuid DEFAULT public.uuid_generate_v4() NOT NULL
);
    DROP TABLE public.students;
       public         heap    postgres    false    2            �            1259    16729    subjects    TABLE     �   CREATE TABLE public.subjects (
    sunject_name character varying(50),
    subject_code character varying(30),
    suject_id uuid DEFAULT public.uuid_generate_v4() NOT NULL
);
    DROP TABLE public.subjects;
       public         heap    postgres    false    2            n           2606    16740    attendance attendance_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (attendance_id);
 D   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_pkey;
       public            postgres    false    219            j           2606    16728    students students_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public            postgres    false    217            l           2606    16734    subjects subjects_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (suject_id);
 @   ALTER TABLE ONLY public.subjects DROP CONSTRAINT subjects_pkey;
       public            postgres    false    218            o           2606    16741 %   attendance attendance_student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(student_id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_student_id_fkey;
       public          postgres    false    4714    219    217            p           2606    16746 %   attendance attendance_subject_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(suject_id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_subject_id_fkey;
       public          postgres    false    4716    219    218           