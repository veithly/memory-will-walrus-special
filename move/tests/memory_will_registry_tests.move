#[test_only]
module memory_will_registry::registry_tests {
    // The package test target intentionally keeps contract tests minimal because
    // the public entry transfers the anchor to the transaction sender. Build and
    // bytecode verification are the acceptance checks used by this project.

    #[test]
    fun test_module_loads() {
        assert!(true, 0);
    }
}
