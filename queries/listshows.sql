-------lists movie_id,MovieName,Date,Time,TheatreName
SELECT
    Movie.MovieID,
    Movie.MovieName,
    Movie_Show.Date,
    Movie_Show.Time,
    Theatre.TheatreName
FROM
    movie_show
JOIN
    movie ON movie_show.MovieID = Movie.MovieID
JOIN
    theatre ON movie_show.TheatreID = Theatre.TheatreID
WHERE
    Movie_Show.TheatreID = 2 AND
    Movie_Show.Date = '2023-01-07';


---lists movie_id,Date,Time

SELECT Movie.MovieID , Movie_Show.Date , Movie_Show.Time
FROM movie_show
JOIN movie ON movie_show.MovieID = Movie.MovieID
WHERE Movie_Show.TheatreID = 1 AND Movie_Show.Date = '2024-01-08';