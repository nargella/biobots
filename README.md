# Biobots
biobots coding challenge https://github.com/biobotsdev/biobots-coding-challenge-2015

Project requires

- Nodejs

## Development

```bash
npm install
npm run electron
# or to start with devtools open
debug=1 npm run electron
```

## Thought process

Each print can be grouped by `print_info.files.input`.  Everything else is esentially meta data for parts of the print or the whole print.

```bash
cat bioprint-data.json | grep file_90.gcode -B 12 -A 18 > test.json
```
Then replaced `--\n--`.

```bash
grep serial test.json
grep email test.json
```
I'm confused by these findings as I thought a print would only have a single printer and user.

```bash
grep layerNum test.json
```
Assumed the data is cleansed oddly. I was originally going allow filter by user or machine on the main view but will instead focus on just prints.

With limited time I've limited my answer to 3 different aggregations.  

For referecne, to get unique print names: 

```bash
grep input bioprint-data.json | awk '{print $2;}' | tr -d '"' | tr -d ',' | sort -u
```
I explored dragging the data set onto the window but that was introducing strange bugs.  I decided to hard code the file within the project directory for time constraint.

I've chosen atom electron because of it's portability.  You will not have to worry about cross browser testing if you package this as an app for each OS.

My preference is to do tests after prototyping but did not have time.  With TDD I would have refactored the code and documented the functionality.  Making a request for the data to an actual printer should be trivial.

I chose to use streams for their speed and flexibility as I imagine the print data files might very large in some cases.  Although the pressure chart I made is probably not a heavy interest to users, it demonstates an aggregation and illustration of data.
