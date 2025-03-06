import { gql, useQuery } from "@apollo/client";

const GET_COUNTRIES = gql`
  query {
    countries(filter: { currency: { eq: "USD" } }) {
      code
      name
      capital
      emoji
      currency
    }
  }
`;
export default function Countries() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data); // prints: {countries: [...]}

  return (
    <div>
      <h1>Countries</h1>
      <ul>
        {data.countries.map((country: any) => (
          <>
            <li key={country.code}>{country.name}</li>
            <li key={country.code}>{country.capital}</li>
            <li key={country.code}>{country.emoji}</li>
            <li key={country.code}>{country.currency}</li>
          </>
        ))}
      </ul>
    </div>
  );
}
