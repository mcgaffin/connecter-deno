// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const BASE_URL = 'http://localhost:3939/__api__/v1';
  const API_KEY = 'ZpTE0dWkf48Ga8gEs7pX7jvHODVydeqX';

  interface ContentItem {
    name: string;
    guid: string;
  }

  interface Command {
    [key: string]: (arg?: any) => void;
  }

  const main = () => {
    const [cmd] = Deno.args;

    const commands: Command = {
      ls: listContent,
      rm: removeContent,
      rmlast: removeLast,
    };

    const command = commands[cmd];

    if (!command) {
      console.log("\n%cI don't know what you want to do\n", 'color: yellow');
      console.log("Usage: cnctr ls | rm | rmlast")
      console.log("  ls - list content");
      console.log("  rm <guid> - remove content item");
      console.log("  rmlast <count> - remove last <count> items");
      return;
    }

    command(...Deno.args.slice(1));
  };

  const listContent = async (silent = false): Promise<[ContentItem] | undefined> => {
    const resp = await fetch(`${BASE_URL}/content`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${API_KEY}`,
      },
    });

    if (resp.status === 200) {
      const contents = await resp.json();

      if (!silent) {
        contents.forEach((item: ContentItem) => {
          console.log(
            `%c${item.guid}: %c${item.name}`,
            'color: green',
            'color: blue; font-weight: bold'
          )
        });
      }

      return contents;
    }

    console.error(`Error fetching content: [${resp.status}] ${resp.statusText}`);
    return;
  };

  const removeContent = async (guid: string) => {
    if (!guid) {
      console.log(
        '%cPlease provide a guid to remove.',
        'color: yellow'
      );
      console.log('For example:');
      console.log('> rm 37fd72ac-b6fc-4128-96cf-c0f1c502bd81');
      return;
    }

    const resp = await fetch(`${BASE_URL}/experimental/content/${guid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Key ${API_KEY}`,
      },
    });

    if (resp.status === 204) {
      console.log(`%cremoved: ${guid}`, 'color: green');
      return;
    }

    console.log(`There was an error: [${resp.status}] ${resp.statusText}`);
  };

  const removeLast = async (howMany: number) => {
    if (!howMany) {
      console.log(
        '%cHow many items would you like to remove?',
        'color: yellow'
      );
      console.log('For example:');
      console.log('> rmlast 5');
      return;
    }
    console.log(`Removing last ${howMany} items.`);
    const contents = await listContent(true);

    contents?.slice(0, howMany).forEach((item) => {
      removeContent(item.guid);
    });
  };

  main();
}
