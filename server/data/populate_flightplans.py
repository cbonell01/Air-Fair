import sqlite3, requests, itertools, json, time

# Connect to the database
con = sqlite3.connect('fixes.db')
cur = con.cursor()
#results = cur.execute('select * from flightplans')
#plans = results.fetchall()

#for plan in plans:
#    print(plan)

# Set up flight plan API
API_PLANS_ENPOINT = 'https://api.flightplandatabase.com/search/plans'
API_ID_ENDPOINT = 'https://api.flightplandatabase.com/plan/'
API_KEY = ''

# Set up SQL queries
insert_query = """INSERT INTO flightplans (origin, destination, flightplan) VALUES (?, ?, ?)"""
#data = ('KSAN', 'KPHX', '{flightplan - KSAN to KPHX}')

# Create [origin, destination] permutations from list of airports
airports = ['KSAN', 'KPHX', 'KLAX', 'KTUS', 'KSFO', 'KSEA', 'KSLC', 'KABQ', 'KDEN', 'KMSP', 'KDAL', 'KHOU', 'KMEM', 'KMSO', 'KJFK', 'KBOS', 'KPDX', 'KBOI', 'KBIL', 'KDIA', 'KCOS', 'KELP', 'KSAT', 'KDFW', 'KIAH', 'KMSY', 'KMDW', 'KORD', 'KMEM', 'KATL', 'KTPA', 'KMIA', 'KJAX', 'KSAV', 'KIAD', 'KDCA', 'KPHL', 'KLGA', 'KEWR', 'KBUF', 'KDTW', 'KCLE', 'KCVG', 'KLEX', 'KBHM', 'KCLT', 'KLAS', 'KOAK', 'KOMA', 'KOKC', 'KSTL', 'PHNL', 'KRNO', 'PANC']
airports = set(airports)
pairs = itertools.permutations(airports, 2)

# Insert rows into database
COUNT = 0
for rte in pairs:
    if COUNT > 1000:
        break
    COUNT += 1

    AIRPORT_PARAMS = {'fromICAO': rte[0], 'toICAO': rte[1]}
    print(AIRPORT_PARAMS)
    time.sleep(5)

    try:
        response = requests.get(url = API_PLANS_ENPOINT, params=AIRPORT_PARAMS)
        print(response)
        print(response.text)
        plan = json.loads(response.text)
        plan_id = plan[0]['id']
        route = requests.get(url = API_ID_ENDPOINT + str(plan_id))
        route_json = json.loads(route.text)
        database_route = str(route_json['route']['nodes'])
        data = (rte[0], rte[1], database_route)
        cur.execute(insert_query, data)
    #except Exception:
        #print("Exception occurred.")

        con.commit()
    except Exception:
        print(Exception)



# Loop over [origin, destinations] to gather flight plans
#cur.execute(insert_query, data)

con.close()