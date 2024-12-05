# Single-Page F1 Dashboard Project

## Overview
This Repository contains the code for Assignment #2 of COMP 3512 at Mount Royal University. The focus of this project is to create a Single-Page Application to view Formula 1 (F1) race data. This project will display race results, driver performance, and constructor standings for the F1 seasons from 2021 to 2024. The primary functionality of this project includes the ability for users to explore race data, view qualifying results, and sort race data by various fields. In addition, users can add their favorite drivers, constructors, or circuits to a favorites list. The project uses API's provided by [Randy Connoly](https://github.com/rconnolly) to fetch the race data which is then utilized to retrieve the relevant race results and statistics.

## Features
- Race Results: Display of race and qualifying results, sortable by multiple fields (e.g., driver position, driver name, constructor).
- Popups: The application includes three modal-style popups to provide additional details about drivers, constructors and circuits.
- Favorites: Users can add and view their favorite drivers, constructors, or circuits.
- Local Storage: To enhance performance, race data is fetched once per season and then stored in the browser's local storage. This minimizes API calls for future visits and improves load times.

## Technologies Used
- HTML, CSS, JavaScript

## Project Structure
- Home View: The initial view displays an option to select an F1 season. Once a season is selected, the application transitions to the "Races" view.
- Races View: Displays all the races of the selected season. Users can click on the race to reveal qualifying and race results, sorted by position. Favorite drivers, constructors, and circuits are visually marked.
- Popups/Modals:
  - Constructor Popup: Provides detailed information about the selected constructor.
  - Driver Popup: Provides detailed information about the selected driver.
  - Circuit Popup: Provides detailed information about the selected circuit.

## Main Project Files
- index.html: The main HTML file that structures the layout.
- assignmentScript.js: Handles the fetching of the race data.
- displayRaces.js: Handles the display of relevant race data and managing the presentation of race-related information.
- popups.js: Manages the functionality for the modal-style popups, including displaying detailed information about drivers, constructors, and circuits.
- sort.js: Implements the sorting functionality for race data, allowing users to sort by various fields.

## API's Used
- https://www.randyconnolly.com/funwebdev/3rd/api/f1/races.php?season=: Returns all the races for the specified season.
- https://www.randyconnolly.com/funwebdev/3rd/api/f1/results.php?season=:  Returns all the results for all the races in the season.
- https://www.randyconnolly.com/funwebdev/3rd/api/f1/qualifying.php?season=: Returns all the qualifying for all the races in the season.
- https://www.randyconnolly.com/funwebdev/3rd/api/f1/drivers.php?id=: Returns single driver specified by the passed driverId value.
- https://www.randyconnolly.com/funwebdev/3rd/api/f1/constructors.php?id=: Returns single constructor specified by the passed constructorId value.

## Contact
Jashan Pal Singh - [jsing785@mtroyal.ca](mailto:jsing785@mtroyal.ca) - [github.com/JashanPalSingh](https://github.com/JashanPalSingh)\
Ishan - [iisha595@mtroyal.ca](mailto:iisha595@mtroyal.ca) - [github.com/Ishan595](https://github.com/Ishan595)
