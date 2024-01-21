/*Entities and Attributes:

1.Theatre:(Entity)
    Attributes: TheatreID (Primary Key), TheatreName, Location

2.Movie:(Entity)
    Attributes: MovieID (Primary Key), MovieName, Genre, Language

3.Movie_Show:(Entity)
    Attributes: ShowID (Primary Key), MovieID (Foreign Key), TheatreID (Foreign Key), Date, Time

4.Ticket:(Entity)
    Attributes: TicketID (Primary Key), ShowID (Foreign Key), SeatNumber, Price
*/

USE BookMyShowDB;
CREATE TABLE Theatre(
    TheatreID INT PRIMARY KEY,
    TheatreName VARCHAR(255),
    Location VARCHAR(255)
);



CREATE Table Movie(
    MovieID INT PRIMARY KEY,
    MovieName VARCHAR(255),
    Rating VARCHAR(255),
    Language VARCHAR(255)
);



CREATE Table Movie_Show(
    ShowID INT PRIMARY KEY,
    MovieID INT,
    TheatreID INT,
    Date DATE,
    Time Time,
    Foreign Key (MovieID) REFERENCES Movie(MovieID),
    Foreign Key (TheatreID) REFERENCES Theatre(TheatreID)
);

CREATE TABLE Ticket (
    TicketID INT PRIMARY KEY,
    ShowID INT,
    SeatNumber VARCHAR(10),
    Price DECIMAL(8, 2),
    BookingTime DATETIME,
    UserID INT,
    FOREIGN KEY (ShowID) REFERENCES Movie_Show(ShowID),
    INDEX idx_show_id (ShowID)
);