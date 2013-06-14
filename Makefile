Location := $(shell pwd)

All:
	@echo Building Accessor Script
	$(shell echo "#!/bin/sh" > jsrepl)
	$(shell echo "$(Location)/jsrepl.sh \"\$$@\"" >> jsrepl)
	$(shell chmod 755 jsrepl)

install: All
	mv jsrepl ~/bin/
