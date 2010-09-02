#!/bin/sh

node "`echo \"$0\" | sed -e 's/jsrepl\.sh/replrequire.js/g'`" "`pwd`" "$@"
