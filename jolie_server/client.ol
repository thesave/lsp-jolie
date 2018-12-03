include "console.iol"
include "string_utils.iol"

interface LSPInterface {
  RequestResponse: syntaxCheck( undefined )( undefined )
}

outputPort Server {
  Location: "socket://localhost:3000"
  Protocol: jsonrpc
  Interfaces: LSPInterface
}

main
{
  req = "main{ println@Console()() }";
  syntaxCheck@Server( req )( res );
  println@Console( res.stderr )()
}