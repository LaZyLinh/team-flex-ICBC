-- Features
INSERT INTO feature VALUES (1, 'TV');
INSERT INTO feature VALUES (2, 'Private');
INSERT INTO feature VALUES (3, 'Conference Phone');


-- Employees
-- INSERT INTO user VALUES (1, 'CLEFAIRYC.3', 'charizard.clefairy@icbc.com', 'Charizard', 'Clefairy', 'IT', 1);
-- INSERT INTO user VALUES (2, 'DROWZEEM.4', 'mankey.drowzee@icbc.com', 'Mankey', 'Drowzee', 'IT', 1);
-- INSERT INTO user VALUES (3, 'GENGARD.6', 'dugtrio.gengar@icbc.com', 'Dugtrio', 'Gengar', 'Finance', 1);
-- INSERT INTO user VALUES (4, 'BELLSPROUTD.8', 'dragonair.bellsprout@icbc.com', 'Dragonair', 'Bellsprout', 'Marketing', 1);
-- INSERT INTO user VALUES (5, 'CHARMELEONP.6', 'primeape.charmeleon@icbc.com', 'Primeape', 'Charmeleon', 'Customer Service', 1);
-- INSERT INTO user VALUES (6, 'SANDSLASHM.6', 'moltres.sandslash@icbc.com', 'Moltres', 'Sandslash', 'HR', 1);
-- INSERT INTO user VALUES (7, 'MCSLOWBROG.1', 'gastly.mcslowbro@icbc.com', 'Gastly', 'McSlowbro', 'HR', 1);
-- INSERT INTO user VALUES (8, 'SQUIRTLES.2', 'shellder.squirtle@icbc.com', 'Shellder', 'Squirtle', 'Customer Service', 1);
-- INSERT INTO user VALUES (9, 'NIDORINOM.2', 'mankey.nidorino@icbc.com', 'Mankey', 'Nidorino', 'Finance', 1);
-- INSERT INTO user VALUES (10, 'GOLDEENC.0', 'cloyster.goldeen@icbc.com', 'Cloyster', 'Goldeen', 'Finance', 1);


-- Floors and Workspaces
INSERT INTO floor VALUES (1, 1, 'Vancouver Building 1', 'Vancouver', '1', NULL);
INSERT INTO workspace VALUES ('1V1-001', '1V1-001', 1, 1);
INSERT INTO workspacefeature VALUES ('1V1-001', 1);
INSERT INTO workspace VALUES ('1V1-002', '1V1-002', 2, 1);
INSERT INTO workspacefeature VALUES ('1V1-002', 1);
INSERT INTO workspacefeature VALUES ('1V1-002', 2);
INSERT INTO workspace VALUES ('1V1-003', '1V1-003', 3, 1);
INSERT INTO workspacefeature VALUES ('1V1-003', 1);
INSERT INTO workspacefeature VALUES ('1V1-003', 3);
INSERT INTO floor VALUES (2, 2, 'Vancouver Building 1', 'Vancouver', '1', NULL);
INSERT INTO workspace VALUES ('1V2-001', '1V2-001', 4, 2);
INSERT INTO workspacefeature VALUES ('1V2-001', 1);
INSERT INTO workspace VALUES ('1V2-002', '1V2-002', 5, 2);
INSERT INTO workspacefeature VALUES ('1V2-002', 1);
INSERT INTO workspacefeature VALUES ('1V2-002', 2);
INSERT INTO workspace VALUES ('1V2-003', '1V2-003', 6, 2);
INSERT INTO workspacefeature VALUES ('1V2-003', 1);
INSERT INTO workspacefeature VALUES ('1V2-003', 3);
INSERT INTO floor VALUES (3, 1, 'North Vancouver Building 1', 'North Vancouver', '1', NULL);
INSERT INTO workspace VALUES ('1NV1-001', '1NV1-001', 7, 3);
INSERT INTO workspacefeature VALUES ('1NV1-001', 1);
INSERT INTO workspace VALUES ('1NV1-002', '1NV1-002', 8, 3);
INSERT INTO workspacefeature VALUES ('1NV1-002', 1);
INSERT INTO workspacefeature VALUES ('1NV1-002', 2);
INSERT INTO workspace VALUES ('1NV1-003', '1NV1-003', 9, 3);
INSERT INTO workspacefeature VALUES ('1NV1-003', 1);
INSERT INTO workspacefeature VALUES ('1NV1-003', 3);
INSERT INTO floor VALUES (4, 2, 'North Vancouver Building 1', 'North Vancouver', '1', NULL);
INSERT INTO workspace VALUES ('1NV2-001', '1NV2-001', 10, 4);
INSERT INTO workspacefeature VALUES ('1NV2-001', 1);
INSERT INTO workspace VALUES ('1NV2-002', '1NV2-002', NULL, 4);
INSERT INTO workspacefeature VALUES ('1NV2-002', 1);
INSERT INTO workspacefeature VALUES ('1NV2-002', 2);
INSERT INTO workspace VALUES ('1NV2-003', '1NV2-003', NULL, 4);
INSERT INTO workspacefeature VALUES ('1NV2-003', 1);
INSERT INTO workspacefeature VALUES ('1NV2-003', 3);
INSERT INTO floor VALUES (5, 1, 'West Vancouver Building 1', 'West Vancouver', '1', NULL);
INSERT INTO workspace VALUES ('1WV1-001', '1WV1-001', NULL, 5);
INSERT INTO workspacefeature VALUES ('1WV1-001', 1);
INSERT INTO workspace VALUES ('1WV1-002', '1WV1-002', NULL, 5);
INSERT INTO workspacefeature VALUES ('1WV1-002', 1);
INSERT INTO workspacefeature VALUES ('1WV1-002', 2);
INSERT INTO workspace VALUES ('1WV1-003', '1WV1-003', NULL, 5);
INSERT INTO workspacefeature VALUES ('1WV1-003', 1);
INSERT INTO workspacefeature VALUES ('1WV1-003', 3);
INSERT INTO floor VALUES (6, 2, 'West Vancouver Building 1', 'West Vancouver', '1', NULL);
INSERT INTO workspace VALUES ('1WV2-001', '1WV2-001', NULL, 6);
INSERT INTO workspacefeature VALUES ('1WV2-001', 1);
INSERT INTO workspace VALUES ('1WV2-002', '1WV2-002', NULL, 6);
INSERT INTO workspacefeature VALUES ('1WV2-002', 1);
INSERT INTO workspacefeature VALUES ('1WV2-002', 2);
INSERT INTO workspace VALUES ('1WV2-003', '1WV2-003', NULL, 6);
INSERT INTO workspacefeature VALUES ('1WV2-003', 1);
INSERT INTO workspacefeature VALUES ('1WV2-003', 3);


-- Availabilities and Bookings
INSERT INTO availability VALUES (1, '2020-03-28', '2020-03-31', '1V1-002', 'Study the past... if you would divine the future.');
INSERT INTO booking VALUES (1, 1, '2020-03-28', '2020-03-29', 1, 1, '1V1-002');
INSERT INTO availability VALUES (2, '2020-03-29', '2020-04-01', '1V1-003', 'Peace comes from within. Do not seek it without.');
INSERT INTO booking VALUES (1, 2, '2020-03-29', '2020-03-30', 2, 2, '1V1-003');
INSERT INTO availability VALUES (3, '2020-03-30', '2020-04-02', '1V2-001', NULL);
INSERT INTO booking VALUES (1, 3, '2020-03-30', '2020-03-31', 3, 3, '1V2-001');
INSERT INTO availability VALUES (4, '2020-03-31', '2020-04-03', '1V2-002', NULL);
INSERT INTO booking VALUES (1, 4, '2020-03-31', '2020-04-01', 4, 4, '1V2-002');
INSERT INTO availability VALUES (5, '2020-04-01', '2020-04-04', '1V2-003', NULL);
INSERT INTO booking VALUES (1, 5, '2020-04-01', '2020-04-03', 5, 5, '1V2-003');
INSERT INTO availability VALUES (6, '2020-04-02', '2020-04-05', '1NV1-001', NULL);
INSERT INTO booking VALUES (1, 6, '2020-04-02', '2020-04-02', 6, 6, '1NV1-001');
INSERT INTO availability VALUES (7, '2020-04-03', '2020-04-06', '1NV1-002', NULL);
INSERT INTO booking VALUES (1, 7, '2020-04-03', '2020-04-05', 7, 7, '1NV1-002');
INSERT INTO availability VALUES (8, '2020-04-04', '2020-04-07', '1NV1-003', 'Trouble is only opportunity in work clothes.');
INSERT INTO booking VALUES (1, 8, '2020-04-04', '2020-04-04', 8, 8, '1NV1-003');
INSERT INTO availability VALUES (9, '2020-04-05', '2020-04-08', '1NV2-001', NULL);
INSERT INTO booking VALUES (1, 9, '2020-04-05', '2020-04-05', 9, 9, '1NV2-001');
INSERT INTO availability VALUES (10, '2020-04-06', '2020-04-09', '1NV2-002', 'Genius is one percent inspiration and ninety-nine percent perspiration.');
INSERT INTO booking VALUES (1, 10, '2020-04-06', '2020-04-07', 0, 10, '1NV2-002');
INSERT INTO availability VALUES (11, '2020-04-07', '2020-04-10', '1NV2-003', NULL);
INSERT INTO booking VALUES (1, 11, '2020-04-07', '2020-04-07', 1, 11, '1NV2-003');
INSERT INTO availability VALUES (12, '2020-04-08', '2020-04-11', '1WV1-001', NULL);
INSERT INTO booking VALUES (1, 12, '2020-04-08', '2020-04-08', 2, 12, '1WV1-001');
INSERT INTO availability VALUES (13, '2020-04-09', '2020-04-12', '1WV1-002', NULL);
INSERT INTO booking VALUES (1, 13, '2020-04-09', '2020-04-11', 3, 13, '1WV1-002');
INSERT INTO availability VALUES (14, '2020-04-10', '2020-04-13', '1WV1-003', 'Having nothing... nothing can he lose.');
INSERT INTO booking VALUES (1, 14, '2020-04-10', '2020-04-11', 4, 14, '1WV1-003');
INSERT INTO availability VALUES (15, '2020-04-11', '2020-04-14', '1WV2-001', NULL);
INSERT INTO booking VALUES (1, 15, '2020-04-11', '2020-04-11', 5, 15, '1WV2-001');
INSERT INTO availability VALUES (16, '2020-04-12', '2020-04-15', '1WV2-002', 'What you give is what you get.');
INSERT INTO booking VALUES (1, 16, '2020-04-12', '2020-04-13', 6, 16, '1WV2-002');
INSERT INTO availability VALUES (17, '2020-04-13', '2020-04-16', '1WV2-003', NULL);
INSERT INTO booking VALUES (1, 17, '2020-04-13', '2020-04-15', 7, 17, '1WV2-003');
INSERT INTO availability VALUES (18, '2020-04-14', '2020-04-17', '1V1-001', NULL);
INSERT INTO booking VALUES (1, 18, '2020-04-14', '2020-04-15', 8, 18, '1V1-001');
INSERT INTO availability VALUES (19, '2020-04-15', '2020-04-18', '1V1-002', NULL);
INSERT INTO booking VALUES (1, 19, '2020-04-15', '2020-04-16', 9, 19, '1V1-002');
INSERT INTO availability VALUES (20, '2020-04-16', '2020-04-19', '1V1-003', NULL);
INSERT INTO booking VALUES (1, 20, '2020-04-16', '2020-04-18', 0, 20, '1V1-003');


