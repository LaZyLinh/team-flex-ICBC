CREATE TABLE `user` (
  `StaffId` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `ICBCEmployeeId` varchar(30),
  `Email` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Department` varchar(255),
  `Valid` boolean NOT NULL
);

CREATE TABLE `workspace` (
  `WorkspaceId` varchar(10) PRIMARY KEY NOT NULL,
  `WorkspaceName` varchar(255) NOT NULL,
  `StaffId` int,
  `FloorId` int NOT NULL
);

CREATE TABLE `floor` (
  `FloorId` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `FloorNo` int NOT NULL,
  `Location` varchar(255) NOT NULL,
  `City` varchar(255) NOT NULL,
  `Building` varchar(255) NOT NULL,
  `FloorPlanUrl` varchar(255)
);

CREATE TABLE `availability` (
  `AvailabilityId` int AUTO_INCREMENT PRIMARY KEY,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `WorkspaceId` varchar(10),
  `Comment` varchar(255)
);

CREATE TABLE `workspaceFeature` (
  `WorkspaceId` varchar(10),
  `FeatureId` int,
  PRIMARY KEY (`WorkspaceId`, `FeatureId`)
);

CREATE TABLE `feature` (
  `FeatureId` int AUTO_INCREMENT PRIMARY KEY,
  `FeatureName` varchar(255) NOT NULL
);

CREATE TABLE `booking` (
  `Confirmed` boolean NOT NULL,
  `BookingId` int AUTO_INCREMENT PRIMARY KEY,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `StaffId` int,
  `AvailabilityId` int,
  `WorkspaceId` varchar(10)
);

CREATE TABLE `archivedBooking` (
  `ArchivedBookingId` int PRIMARY KEY,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `StaffId` int,
  `ArchivedAvailabilityId` int
);

CREATE TABLE `archivedAvailability` (
  `ArchivedAvailabilityId` int PRIMARY KEY,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `WorkspaceId` varchar(10)
);

ALTER TABLE `workspace` ADD FOREIGN KEY (`StaffId`) REFERENCES `user` (`StaffId`);

ALTER TABLE `workspace` ADD FOREIGN KEY (`FloorId`) REFERENCES `floor` (`FloorId`);

ALTER TABLE `availability` ADD FOREIGN KEY (`WorkspaceId`) REFERENCES `workspace` (`WorkspaceId`);

ALTER TABLE `workspaceFeature` ADD FOREIGN KEY (`WorkspaceId`) REFERENCES `workspace` (`WorkspaceId`);

ALTER TABLE `workspaceFeature` ADD FOREIGN KEY (`FeatureId`) REFERENCES `feature` (`FeatureId`);

ALTER TABLE `booking` ADD FOREIGN KEY (`StaffId`) REFERENCES `user` (`StaffId`);

ALTER TABLE `booking` ADD FOREIGN KEY (`AvailabilityId`) REFERENCES `availability` (`AvailabilityId`) ON DELETE CASCADE;

ALTER TABLE `booking` ADD FOREIGN KEY (`WorkspaceId`) REFERENCES `workspace` (`WorkspaceId`);

ALTER TABLE `archivedBooking` ADD FOREIGN KEY (`StaffId`) REFERENCES `user` (`StaffId`);

ALTER TABLE `archivedBooking` ADD FOREIGN KEY (`ArchivedAvailabilityId`) REFERENCES `archivedAvailability` (`ArchivedAvailabilityId`);

ALTER TABLE `archivedAvailability` ADD FOREIGN KEY (`WorkspaceId`) REFERENCES `workspace` (`WorkspaceId`);
