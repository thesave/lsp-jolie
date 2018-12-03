include "console.iol"
include "string_utils.iol"
include "file.iol"
include "exec.iol"

interface LSPInterface {
  RequestResponse: syntaxCheck( undefined )( undefined )
}

inputPort Server {
  Location: "socket://localhost:3000"
  Protocol: jsonrpc
  Interfaces: LSPInterface
}

execution{ concurrent }

main
{
  syntaxCheck( req )( res ){
    valueToPrettyString@StringUtils( req )( t );
    w.filename = new + ".ol";
    w.content << req;
    writeFile@File( w )();
    cmd = "jolie";
    cmd.args[0] = "--check";
    cmd.args[1] = w.filename;
    cmd.stdOutConsoleEnable = true;
    cmd.waitFor = 1;
    exec@Exec( cmd )( res );
    valueToPrettyString@StringUtils( res )( t );
    println@Console( t )();
    delete@File( w.filename )()
  }
}