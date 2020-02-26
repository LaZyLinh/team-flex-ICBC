 insert into `user`(Email,FirstName,LastName,Department,Valid) values ("2013oct20@gmail.com", "Charlie", "Chen", "Computer Scientist", true);

insert into `user`(Email,FirstName,LastName,Department,Valid) values ("aalmekhlafy@gmail.com", "Asem", "Ghaleb", "R&D", true);

insert into `user`(Email,FirstName,LastName,Department,Valid) values ("ravinakaur@hotmail.com", "Ravina", "Gill", "IT", true);

insert into `user`(Email,FirstName,LastName,Department,Valid) values ("john.hua.zou@gmail.com", "John", "Zou", "Management", true);

insert into `user`(Email,FirstName,LastName,Department,Valid) values ("Kevinyw98@gmail.com", "Keven", "Yw", "Business", true);

insert into `user`(Email,FirstName,LastName,Department,Valid) values ("linh.phan3413@gmail.com", "Linh", "Phan", "Medical", true);

insert into `user`(Email,FirstName,LastName,Department,Valid) values ("srijonsaha345@gmail.com", "Srijon", "Saha", "Markating", true);

insert into `floor`(Location, FloorNo, City,Building) values ("151 West Esplanade", 4, "North Vancouver, BC", 1);

insert into `floor`(Location, FloorNo, City,Building) values ("151 West Esplanade", 1, "North Vancouver, BC", 2);

insert into `floor`(Location, FloorNo, City,Building) values ("151 West Esplanade", 1, "North Vancouver, BC", 1);

insert into `floor`(Location, FloorNo, City,Building) values ("4126 Macdonald St,", 1, "Vancouver, BC", 1);

insert into `workspace`(WorkspaceId, WorkspaceName, StaffId, FloorId) values ("NV4-02A", "North Vancouver, Building 1, 4th floor, 02A", 1, 1);

insert into `workspace`(WorkspaceId, WorkspaceName, StaffId, FloorId) values ("NV4-02B", "North Vancouver, Building 1, 4th floor, 02B", 4, 1);

insert into `workspace`(WorkspaceId, WorkspaceName, StaffId, FloorId) values ("NC1-01D", "Vancouver, Building 1, 1st floor, 01D", 2, 4);

insert into `workspace`(WorkspaceId, WorkspaceName, StaffId, FloorId) values ("NC1-02A", "Vancouver, Building 1, 1st floor, 06C", 3, 4);

insert into `feature`(FeatureName) value ("TV");

insert into `feature`(FeatureName) value ("private office");

insert into `feature`(FeatureName) value ("computer");

insert into `workspaceFeature`(WorkspaceId, FeatureId) value ("NC1-01D", 2);

insert into `workspaceFeature`(WorkspaceId, FeatureId) value ("NC1-01D", 1);

insert into availability(StartDate, EndDate, WorkspaceId) value ('2020-03-01', '2020-03-30', "NC1-02A");

insert into availability(StartDate, EndDate, WorkspaceId) value ('2020-01-01', '2020-01-15', "NC1-01D");

insert into availability(StartDate, EndDate, WorkspaceId) value ('2020-04-01', '2020-04-04', "NC1-01D");

insert into booking(Confirmed, StartDate, EndDate, StaffId, AvailabilityId, WorkspaceId) value (true, '2020-04-01', '2020-04-04', 2, 3, "NC1-01D");
