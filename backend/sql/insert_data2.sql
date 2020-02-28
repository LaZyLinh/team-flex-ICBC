insert into `floor`(Location, FloorNo, City,Building) values ("151 West Esplanade", 3, "North Vancouver, BC", 1);
insert into `floor`(Location, FloorNo, City,Building) values ("151 West Esplanade", 2, "North Vancouver, BC", 1);
insert into `floor`(Location, FloorNo, City,Building) values ("151 West Esplanade", 1, "North Vancouver, BC", 1);

insert into `floor`(Location, FloorNo, City,Building) values ("151 West Esplanade", 2, "North Vancouver, BC", 2);
insert into `floor`(Location, FloorNo, City,Building) values ("151 West Esplanade", 3, "North Vancouver, BC", 2);
insert into `floor`(Location, FloorNo, City,Building) values ("151 West Esplanade", 4, "North Vancouver, BC", 2);

insert into `floor`(Location, FloorNo, City,Building) values ("4126 Macdonald St,", 2, "Vancouver, BC", 1);
insert into `floor`(Location, FloorNo, City,Building) values ("4126 Macdonald St,", 3, "Vancouver, BC", 1);
insert into `floor`(Location, FloorNo, City,Building) values ("4126 Macdonald St,", 4, "Vancouver, BC", 1);
insert into `floor`(Location, FloorNo, City,Building) values ("4126 Macdonald St,", 5, "Vancouver, BC", 1);


insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV4-02C", "North Vancouver, Building 1, 4th floor, 02C", 1);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV4-02D", "North Vancouver, Building 1, 4th floor, 02D", 1);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV4-02E", "North Vancouver, Building 1, 4th floor, 02E", 1);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV4-02F", "North Vancouver, Building 1, 4th floor, 02F", 1);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV4-03A", "North Vancouver, Building 1, 4th floor, 03A", 1);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV4-03B", "North Vancouver, Building 1, 4th floor, 03B", 1);

insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV1-20A", "North Vancouver, Building 2, 1st floor, 20A", 2);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV1-20B", "North Vancouver, Building 2, 1st floor, 20B", 2);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV1-20C", "North Vancouver, Building 2, 1st floor, 20C", 2);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV1-20D", "North Vancouver, Building 2, 1st floor, 20D", 2);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV1-20E", "North Vancouver, Building 2, 1st floor, 20E", 2);

insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV1-10A", "North Vancouver, Building 1, 1st floor, 10A", 3);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV1-10B", "North Vancouver, Building 1, 1st floor, 10B", 3);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV1-10C", "North Vancouver, Building 1, 1st floor, 10C", 3);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV1-10D", "North Vancouver, Building 1, 1st floor, 10D", 3);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV1-10E", "North Vancouver, Building 1, 1st floor, 10E", 3);

insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV3-10A", "North Vancouver, Building 1, 3rd floor, 10A", 5);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV3-10B", "North Vancouver, Building 1, 3rd floor, 10B", 5);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV3-10C", "North Vancouver, Building 1, 3rd floor, 10C", 5);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV3-10D", "North Vancouver, Building 1, 3rd floor, 10D", 5);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NV3-10E", "North Vancouver, Building 1, 3rd floor, 10E", 5);

insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC2-01A", "Vancouver, Building 1, 2nd floor, 01A", 11);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC2-01B", "Vancouver, Building 1, 2nd floor, 01B", 11);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC2-01C", "Vancouver, Building 1, 2nd floor, 01C", 11);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC2-01D", "Vancouver, Building 1, 2nd floor, 01D", 11);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC2-01E", "Vancouver, Building 1, 2nd floor, 01E", 11);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC2-01F", "Vancouver, Building 1, 2nd floor, 01F", 11);

insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC3-01A", "Vancouver, Building 1, 3rd floor, 01A", 12);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC3-01B", "Vancouver, Building 1, 3rd floor, 01B", 12);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC3-01C", "Vancouver, Building 1, 3rd floor, 01C", 12);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC3-01D", "Vancouver, Building 1, 3rd floor, 01D", 12);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC3-01E", "Vancouver, Building 1, 3rd floor, 01E", 12);
insert into `workspace`(WorkspaceId, WorkspaceName, FloorId) values ("NC3-01F", "Vancouver, Building 1, 3rd floor, 01F", 12);

update `workspace` set WorkspaceName="Vancouver, Building 1, 1st floor, 02A" where WorkspaceId="NC1-02A"; 