#!/usr/bin/python

###############################################################################
# An experiment to determine how much more effort it takes to build Structures
# than to break them.

import random
def rollD(sides):
	return random.randint(1, sides)

def buildWall(hd):
	attempts = 0
	currentHD = 0

	while currentHD < hd:
		attempts = attempts + 1
		attemptResult = rollD(10)
		if attemptResult == 10:
			# Now the wall has a chance to resist.
			wallResisted = False

			resistAttempt = 0
			while not wallResisted and resistAttempt < currentHD:
				resistAttempt = resistAttempt + 1
				resist = rollD(10)
				if resist == 10:
					wallResisted = True	

			if not wallResisted:
				currentHD = currentHD + 1

	return attempts

def printUsage():
	print "breakwall.py [-h=hd|--hd hd] [-n nwalls|--nwalls=nwalls]"
	print "\thd: Number of HD to build the wall up to." 
	print "\tnwalls: Number times to build the wall, for averaging." 

import sys, getopt
def main(argv):
	hd = 0
	nwalls = 1
	try:
		opts, args = getopt.getopt(argv, "h:n:",["hd=","nwalls="])
	except getopt.GetoptError:
		printUsage()
		sys.exit(2)
	for opt, arg in opts:
		if opt in ("-h", "--hd"):
			hd = int(arg)
		if opt in ("-n", "--nwalls"):
			nwalls = int(arg)

	attemptTotal = 0
	iwall = 0
	while nwalls > iwall:
		attempts = buildWall(hd)
		print "Took %d attempts." % (attempts)
		attemptTotal = attemptTotal + attempts
		iwall = iwall + 1

	avg =  attemptTotal / nwalls
	print "Average wall attempt: %d" % (avg)

if __name__ == "__main__":
	main(sys.argv[1:])

