create table users(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    mobile_number bigint(10) NOT NULL,
    phone_code int(3),
    email varchar(50),
    password varchar(50),
    role varchar(50),
    address varchar(250),
    status varchar(50),
    UNIQUE(mobile_number)
);
insert into users(name,mobile_number,phoneCode,email,password,role,address,status) values('om prakash', 0053900700,'+91','om.prakash@gmail.com','admin','admin','Bangalore','active');
-- alter table `myshop`.`users` modify column `phoneCode` varchar(3);
ALTER TABLE `myshop`.`users` 
CHANGE COLUMN `phoneCode` `phone_code` INT NULL DEFAULT NULL ;
-- INSERT INTO `myshop`.`user` (`id`, `name`, `phone`, `phoneCode`, `email`, `password`, `role`, `address`, `status`) VALUES ('2', 'test user', '8553900794', '+91', 'alt.h4-89mdzeb@yopmail.com', 'test', 'user', 'Bangalore', 'active');
-- UPDATE `myshop`.`user` SET `password` = 'admin123' WHERE (`id` = '1');
-- 06-04-2023 --
create table customer_invoice(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(250) DEFAULT NULL,
    mobile_number bigint(10) DEFAULT NULL,
    purchase_date datetime DEFAULT NULL,
    comments varchar(250) DEFAULT NULL,
    total bigint(50) DEFAULT NULL,
    paid bigint(50) DEFAULT NULL,
    dues bigint(50) DEFAULT NULL,
    dues_paid bigint(50) DEFAULT NULL,
    dues_paid_date datetime DEFAULT NULL,
    m1 varchar(250) DEFAULT NULL,
    m2 varchar(250) DEFAULT NULL,
    m3 varchar(250) DEFAULT NULL,
    m4 varchar(250) DEFAULT NULL,
    m5 varchar(250) DEFAULT NULL,
    m6 varchar(250) DEFAULT NULL,
    m7 varchar(250) DEFAULT NULL,
    m8 varchar(250) DEFAULT NULL,
    m9 varchar(250) DEFAULT NULL,
    m10 varchar(250) DEFAULT NULL,
    m1q bigint(20) DEFAULT NULL,
    m2q bigint(20) DEFAULT NULL,
    m3q bigint(20) DEFAULT NULL,
    m4q bigint(20) DEFAULT NULL,
    m5q bigint(20) DEFAULT NULL,
    m6q bigint(20) DEFAULT NULL,
    m7q bigint(20) DEFAULT NULL,
    m8q bigint(20) DEFAULT NULL,
    m9q bigint(20) DEFAULT NULL,
    m10q bigint(20) DEFAULT NULL,
    m1p bigint(20) DEFAULT NULL,
    m2p bigint(20) DEFAULT NULL,
    m3p bigint(20) DEFAULT NULL,
    m4p bigint(20) DEFAULT NULL,
    m5p bigint(20) DEFAULT NULL,
    m6p bigint(20) DEFAULT NULL,
    m7p bigint(20) DEFAULT NULL,
    m8p bigint(20) DEFAULT NULL,
    m9p bigint(20) DEFAULT NULL,
    m10p bigint(20) DEFAULT NULL,
    PRIMARY KEY (`id`)
    -- UNIQUE(name)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;