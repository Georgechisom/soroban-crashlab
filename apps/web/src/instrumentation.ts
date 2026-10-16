// Issue #1842: Boot-time configuration validation hook
// This file is called once during server startup (Next.js instrumentation hook)

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Validate configuration at boot time
    const { validateAndThrow } = await import("./lib/config/validate");

    try {
      validateAndThrow();
      console.log("✅ Configuration validation passed");
    } catch (error) {
      console.error(
        "\n" +
          (error instanceof Error
            ? error.message
            : "Configuration validation failed"),
      );
      process.exit(1);
    }
  }
}
