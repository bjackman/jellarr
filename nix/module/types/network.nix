{lib}: let
  inherit (lib) types mkOption optionalAttrs;

  inherit (types) nullOr listOf str;

  networkConfigType = types.submodule {
    options = {
      knownProxies = mkOption {
        type = nullOr (listOf str);
        default = null;
        description = "List of trusted proxy server IP addresses or hostnames.";
      };
    };
  };

  mkNetworkConfig = cfg:
    {}
    // optionalAttrs (cfg.knownProxies != null) {inherit (cfg) knownProxies;};
in {
  inherit networkConfigType mkNetworkConfig;
}
