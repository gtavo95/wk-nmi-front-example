// const { GoogleAuth } = require("google-auth-library");
import { GoogleAuth } from "google-auth-library";
import { Plans } from "wk-nmi";

async function getPlans() {
  const auth = new GoogleAuth();
  const url = process.env.WK_NMI_SERVER;
  const organization = process.env.NMI_ORGANIZATION;
  if (url && organization) {
    console.info(`request ${url} with target audience ${url}`);
    const client = await auth.getIdTokenClient(url);
    const tokenId = await client.idTokenProvider.fetchIdToken(url);

    const plan = new Plans(url, organization, tokenId);
    const plans = await plan.all();
    if (plans.status === 200) return plans.response;
    else return [];
  }
}

export default async function Page() {
  const plans = await getPlans();

  return (
    <div className="flex flex-col h-screen w-screen bg-white overflow-auto gap-3">
      {/* titulo */}
      <h1 className="text-black text-2xl">Plans</h1>
      {/* plans */}
      <div className="flex flex-row flex-wrap gap-1">
        {plans &&
          plans.map((plan: any) => (
            <div
              key={plan.plan_id}
              className="flex flex-col rounded-lg border border-gray-400 text-black p-3"
            >
              <h1>Name: {plan.plan_name}</h1>
              <p>payments: {plan.plan_payments}</p>
              <p>Amounts: {plan.plan_amount}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
