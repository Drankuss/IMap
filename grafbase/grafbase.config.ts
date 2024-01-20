import { config, connector, graph, auth } from "@grafbase/sdk";
import { AuthRules } from "@grafbase/sdk/dist/src/auth";

const g = graph.Standalone();

const mongo = connector.MongoDB("MongoDB", {
  apiKey: g.env("MONGODB_API_KEY"),
  url: g.env("MONGODB_API_URL"),
  dataSource: g.env("MONGODB_DATASOURCE"),
  database: g.env("MONGODB_DATABASE"),
});

// @ts-ignore
const User = g
  .type("User", {
    fields: {
      name: g.string(),
      email: g.string(),
      avatarUrl: g.url(),
      description: g.string().optional(),
      projects: g
        .relation(() => Project)
        .list()
        .optional(),
    },
  })
  .auth((rules: AuthRules) => {
    rules.public().read();
  });

// @ts-ignore
const Project = g
  .type("Project", {
    fields: {
      title: g.string(),
      description: g.string(),
      image: g.url(),
      liveSiteUrl: g.url(),
      category: g.string().search(),
      createdBy: g.relation(() => User),
    },
  })
  .auth((rules: AuthRules) => {
    rules.public().read();
    rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

g.datasource(mongo);

export default config({
  graph: g,
  auth: {
    providers: [jwt],
    rules: (rules) => {
      rules.private();
    },
  },
});
