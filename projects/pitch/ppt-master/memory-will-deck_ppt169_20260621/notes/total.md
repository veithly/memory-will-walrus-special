# 01_killed_agent_scoped_receipt

Memory Will is a working handoff surface for agent succession. The first click kills the predecessor agent, the user chooses what can survive, and the app returns a receipt instead of a generic saved chat summary.

# 02_handoff_without_leakage

The core product choice is scoped inheritance. Approved memory becomes restorable, but blocked memory stays named and unavailable. That makes the handoff useful without pretending all prior context should be inherited.

# 03_product_run_kill_write_restore_inspect

The live run is a four-step loop: Kill Agent, write the scoped will to Walrus, open a cold successor through a Walrus read, and inspect the receipt. Build, typecheck, Sui build, and Sui tests have all passed sequentially.

# 04_walrus_is_restore_gate

Walrus is on the restore path. The app writes the will before restore is enabled and reads the blob before successor output appears. If the Walrus write or read fails, Memory Will does not fake a successful handoff.

# 05_sui_proof_boundary

The Sui claim is intentionally bounded. The app reads Sui object metadata for the Walrus object id, and the repo includes a Move package that builds and tests locally. We do not claim the registry is published unless package id and signer are configured.

# 06_try_then_inspect

The judge path is simple: open the live URL, click Kill Agent, write the will, open the cold successor, then inspect `/?will=latest`. Final hackathon form submission still requires explicit human approval.
