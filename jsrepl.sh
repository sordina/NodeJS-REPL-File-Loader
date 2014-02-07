#!/bin/sh

exec node "`echo \"$0\" | sed -e 's/jsrepl\.sh/replrequire.js/g'`" "`pwd`" "$@"
