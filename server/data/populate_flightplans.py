import sqlite3, requests, itertools, json, time
from requests.auth import HTTPBasicAuth

# Connect to the database
con = sqlite3.connect('fixes.db')
cur = con.cursor()
results = cur.execute('select * from flightplans')
plans = results.fetchall()

# Set up flight plan API
API_PLANS_ENPOINT = 'https://api.flightplandatabase.com/search/plans'
API_ID_ENDPOINT = 'https://api.flightplandatabase.com/plan/'
API_KEY = 'Xjinir5LX5SoqK7VwSczxmc6LpmKsy6JAdkxLbFL'
API_KEY_2 = 'DDQAAVtKMjzyeNWQSfZLXMoCtbeNRb9h0kHl87lS'

# Set up SQL queries
insert_query = """INSERT INTO flightplans (origin, destination, flightplan) VALUES (?, ?, ?)"""
update_query = """UPDATE flightplans SET flightplan = ? WHERE id = ?"""

# Create [origin, destination] permutations from list of airports
#airports = ['KSAN', 'KPHX', 'KLAX', 'KTUS', 'KSFO', 'KSEA', 'KSLC', 'KABQ', 'KDEN', 'KMSP', 'KDAL', 'KHOU', 'KMEM', 'KMSO', 'KJFK', 'KBOS', 'KPDX', 'KBOI', 'KBIL', 'KDIA', 'KCOS', 'KELP', 'KSAT', 'KDFW', 'KIAH', 'KMSY', 'KMDW', 'KORD', 'KMEM', 'KATL', 'KTPA', 'KMIA', 'KJAX', 'KSAV', 'KIAD', 'KDCA', 'KPHL', 'KLGA', 'KEWR', 'KBUF', 'KDTW', 'KCLE', 'KCVG', 'KLEX', 'KBHM', 'KCLT', 'KLAS', 'KOAK', 'KOMA', 'KOKC', 'KSTL', 'PHNL', 'KRNO', 'PANC']
#airports = set(airports)
#pairs = itertools.permutations(airports, 2)

# Insert rows into database
COUNT = 0
for rte in plans:
    COUNT += 1
    row_ID = rte[0]
    org = rte[1]
    dest = rte[2]
    route = rte[3]
    database_route = None
    AIRPORT_PARAMS = {'fromICAO': org, 'toICAO': dest}
    #time.sleep(1.5)

    if route == None: # If there is no route for an [org, dest] pair, then get one
        try:
            # First, get a group of routes
            response = requests.get(url = API_PLANS_ENPOINT, params=AIRPORT_PARAMS, auth=HTTPBasicAuth(API_KEY_2, ''))
            print(response.text)
            plan = json.loads(response.text)
            plan_id = plan[0]['id']
        except Exception:
            print("Exception in GROUP")

        try:
            # Second, get a specific route
            route = requests.get(url = API_ID_ENDPOINT + str(plan_id), auth=HTTPBasicAuth(API_KEY_2, ''))
            route_json = json.loads(route.text)
            database_route = str(route_json['route']['nodes'])
        except Exception:
            print("Exception in SINGLE")

        # Create the route for insertion into the database
        data = (database_route, row_ID)

        # Insert route into database
        cur.execute(update_query, data)
        con.commit()

    #if COUNT > 1000:
    #    break

con.close()