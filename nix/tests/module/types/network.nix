{
  lib,
  assertEq,
  ...
}: let
  types = import ../../../module/types {inherit lib;};
  inherit (types.network) mkNetworkConfig;

  nullConfig = {
    knownProxies = null;
  };
in [
  (assertEq "full network config" (mkNetworkConfig (nullConfig
    // {
      knownProxies = ["127.0.0.1" "10.0.0.1"];
    })) {
    knownProxies = ["127.0.0.1" "10.0.0.1"];
  })

  (assertEq "empty network config" (mkNetworkConfig nullConfig) {})
]
