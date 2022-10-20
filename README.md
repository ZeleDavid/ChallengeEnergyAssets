# Challenge EnergyAssets

## Instructions

After pulling repository make sure to run `npm install` to install all dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Documentation

The application is result of a frontend challenge. Entire backend is mocked.

**General functionality:**

- Authenticate users via JWT (login page + logout button on dashboard page)
- Viewing all available assets
- Picking one of the assets and viewing asset activity TimeSeries data on line chart

**The general page breakdown looks like this:**

- Home page / Dashboard (URL: / )
    - List of energy assets (as it is mocked, assets are generated randomly)
    - Line chart that shows Active power and Voltage measurements for chosen asset (as it is mocked, values are generated randomly)
    - Logout button
- Sign in page (URL: /login )
    - Uses JWT (store the token in localStorage)
    - Username and password input (as it is mocked, any username and password input returns a working JWT)
    
    
**Components:**

- Dashboard
    - getAssets method that calls assetService, returns list of all asset activity data and maps unique assets to another list
    - setChartData method that displays data on chart for chosen option from selection of all assets
    - logout method
    - chart options initialization - defining data, labels, type...
- Login
    - Form initialization and onSubmit method
    
**Services:**

- Asset service
    - getAssetActivity method that generates a random amount of assets between 3 and 10, sorts generated activity by timestamp and returns a list for all assets
    - generateRandomObject method that generated a random EnergyAssetTimeSeries object (for mocking data)
    - randomIntFromInterval method that generates a random integer between two values

- Authentication service
    - login and logout methods that either add or remove the JWT token from local storage and navigates to route
    - isLoggedIn method that checks whether user is logged in
    - getToken method that returns token if it exists in local storage
    
**Helpers:**

- Authentication guard - guard for navigating user back to /login route if not logged in

- Energy asset timeseries data - interface with data model

- Token interceptor - injectable for setting token as authorization header in every request

**Client:**

- Authentication client with login method - mocks checking username and password to api
