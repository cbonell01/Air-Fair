import sqlite3, re, requests, time

# Connect to the database
con = sqlite3.connect('fixes.db')
cur = con.cursor()
results = cur.execute('select * from fixes LIMIT 300')
weather_locations = results.fetchall()

# Set up the calls to the Weather API
API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall'#'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}'
API_KEY = '7ed03a82f1b90a06d594b044bfcaa7ca'
EXCLUDE = ['minutely,hourly,daily,alerts']
update_query = """UPDATE fixes SET time = ?, weather = ? WHERE fix = ?"""

def parse_coordinate(coord):
    coord = coord.split(' ')
    if len(coord) > 2: # weird coordinates
        coord = coord[-2:]
    else: # normal coordinates
        coord;

    return coord;

def calculate_coordinate(coord):
    for azimuth in coord:
        splits = re.split('[-.]', azimuth)
        cardinal_direction = splits[3][-1:]
        degree = round(int(splits[0]) + int(splits[1]) / 60 + int(splits[2]) / 3600 , 3)
        
        if cardinal_direction == 'N':
            lat = degree;
        elif cardinal_direction == 'S':
            lat = -degree;
        elif cardinal_direction == 'W':
            lon = -degree
        elif cardinal_direction == 'E':
            lon = degree

    return [lat, lon]


for fix in weather_locations:
    time_gathered = fix[3]
    if time_gathered != None:
        continue;
    else: # No weather exists for location
        [lat, lon] = calculate_coordinate(parse_coordinate(fix[2]))
        PARAMS = {'lat':lat, 'lon':lon, 'exclude': EXCLUDE, 'appid':API_KEY}
        weather = requests.get(url = API_ENDPOINT, params=PARAMS)
        data = (time.time(), weather.text, fix[0])
        cur.execute(update_query, data)
        con.commit()
        time.sleep(.9)

con.close()