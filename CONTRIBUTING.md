# Help the empire grow

Bug fixes, clearer menus, new dialogue and small quality-of-life improvements are welcome. Open an issue before a large feature so we can agree on its scope.

1. Fork the repository and create a branch.
2. Run `npm ci`, then `npm run dev`.
3. Make your change and run `npm test` and `npm run build`.
4. For artwork or interface changes, include a screenshot in your pull request.

Keep these game rules intact: two hours of offline income, saved progress across updates, Pokémon-only managers, region-appropriate shops, automatic stories, and dialogue sprites standing on the ground. Save migrations should preserve an existing empire. Keep third-party artwork credits with the assets.

The Windows desktop build must work with the network disconnected. Sprite, portrait, item and font assets should remain local. Use `npm run desktop:pack` on Windows to check the portable app and installer.
