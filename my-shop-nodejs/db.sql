create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    phone bigint(10),
    phoneCode int(3),
    email varchar(50),
    password varchar(50),
    role varchar(50),
    address varchar(250),
    status varchar(50),
    UNIQUE(phone)
);
insert into user(name,phone,phoneCode,email,password,role,address,status) values('om prakash', 8553900794,'+91','ops.prakash@gmail.com','admin','admin','Bangalore','active');
alter table `myshop`.`user` modify column `phoneCode` varchar(3);
-- INSERT INTO `myshop`.`user` (`id`, `name`, `phone`, `phoneCode`, `email`, `password`, `role`, `address`, `status`) VALUES ('2', 'test user', '8553900794', '+91', 'alt.h4-89mdzeb@yopmail.com', 'test', 'user', 'Bangalore', 'active');
-- UPDATE `myshop`.`user` SET `password` = 'admin123' WHERE (`id` = '1');