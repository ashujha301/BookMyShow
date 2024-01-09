INSERT INTO Theatre (TheatreID, TheatreName, Location) VALUES 
    (1, 'Pvr Nexus', 'Kormangala'),
    (2,'Pheonix','Whitefield'),
    (3,'Forum','Sarjapur');

INSERT INTO Movie (MovieID, MovieName, Rating, Language) VALUES 
    (1, 'Kisi ka bhai kisi ki jaan', '(UA)', 'Hindi'),
    (2, 'Dasara', '(UA)', 'Telugu'),
    (3,'To Jhooti mai makkar','(UA)','Hindi');

INSERT INTO movie_show (ShowID, MovieID, TheatreID, Date, Time) VALUES 
    (1, 1, 1, '2024-01-08', '18:00:00'),
    (2, 2, 1, '2024-01-09', '15:30:00'),
    (3,3,2,'2024-01-07','15:00:00');

INSERT INTO Ticket (TicketID, ShowID, SeatNumber, Price) VALUES 
    (1, 1, 'A1', 300.00),
    (2, 2, 'J10', 250.00),
    (3, 3, 'B12', 150.00);