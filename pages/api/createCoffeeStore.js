const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("coffee-stores");

const createCoffeeStore = async (req, res) => {
  const { id, name, neighborhood, address, imgUrl, voting } = req.body;

  if (req.method === "POST") {
    try {
      if (id) {
        const findCoffeeStore = await table
          .select({
            filterByFormula: `id=${id}`,
          })
          .firstPage();

        if (findCoffeeStore.length !== 0) {
          const records = findCoffeeStore.map((record) => {
            return {
              ...record.fields,
            };
          });

          res.json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  voting,
                  imgUrl,
                },
              },
            ]);

            const records = createRecords.map((record) => {
              return {
                ...record.fields,
              };
            });

            res.json({
              message: "Create a record",
              records,
            });
          } else {
            res.status(400).json({
              message: "Please provide id and name",
            });
          }
        }
      } else {
        res.status(400).json({
          message: "Please provide id",
        });
      }
    } catch (error) {
      console.error({ error });
      res.status(500).json({ error });
    }
  }
};

export default createCoffeeStore;
