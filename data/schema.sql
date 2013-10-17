create database if not exists web_historian;
use web_historian;
create table if not exists archives
(site varchar(50),
disklocation varchar(150),
timearchived bigint(13));

insert into archives
  (site, disklocation, timearchived)
  values ('www.google.com','/Users/hackreactor/code/katemonkeys/2013-09-web-historian/data/sites/www.google.com', 1382035795525);