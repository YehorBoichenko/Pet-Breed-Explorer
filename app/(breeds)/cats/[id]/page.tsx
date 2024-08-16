import { Metadata, ResolvingMetadata } from "next";
import { getCatBreed } from "@/shared/api/getBreeds";
import { Wrapper } from "@/shared/components/Wrapper";
import Image from "next/image";

type Props = {
    params: { id: string };
};
const features = [
  'indoor',
  'experimental',
  'hairless',
  'natural',
  'rare',
  'rex',
  'suppressed_tail',
  'short_legs',
  'hypoallergenic',
];

const characteristic = [
  'adaptability',
  'affection_level',
  'child_friendly',
  'dog_friendly',
  'energy_level',
  'grooming',
  'health_issues',
  'intelligence',
  'shedding_level',
  'social_needs',
  'stranger_friendly',
  'vocalisation',
];
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const data = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=` + id,
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_CATS_API_KEY as string,
      },
    }
  ).then((res) => res.json());

  return {
    title: data[0].breeds[0].name,
  };
}

export default async function CatBreedpage({ params }: { params: { id: string } }) {
    const data = await getCatBreed(params.id);

    if (!data.length || !data[0].breeds.length) {
      return <Wrapper className="px-4 md:px-4 lg:px-4">Breed not found</Wrapper>;
    }

    const breed = data[0].breeds[0];

    return (
        <Wrapper className="px-4 md:px-4 lg:px-4">
<article className="flex flex-col items-center w-full mb-2 lg:flex-col lg:items-center lg:px-5 lg:mb-5 xl:flex-row-reverse xl:items-start">
  <aside className="w-full px-2 pt-5 flex flex-col gap-2 lg:px-0 lg:max-w-[50%] lg:pl-10 lg:pt-10 xl:sticky xl:top-0">
    <div className="flex flex-col gap-2 justify-between sm:flex-row sm:items-center">
      <h1 className="text-3xl font-bold md:text-5xl">{breed.name}</h1>
<span className="w-fit py-1 px-2 bg-[rgb(7,65,115)] text-white rounded-2xl text-sm text-center md:text-lg">
  {breed.origin}
</span>
    </div>
    <p className="text-lg md:text-xl">{breed.temperament}</p>
    <p className="mb-2 text-lg md:text-xl">
      <b>Life span:</b> {breed.life_span} years
    </p>
    <p className="p-3 rounded-lg text-sm md:text-lg">{breed.description}</p>
    <ul className="p-3 rounded-lg grid grid-cols-1 text-sm md:text-lg">
      {characteristic.map((trait: string) => {
        if (breed[trait]) {
          return (
            <li key={trait}>
              <b className="capitalize">{trait.replace('_', ' ')}:</b>{' '}
              {breed[trait]}/5
            </li>
          );
        }
      })}
    </ul>
    <ul className="flex gap-3 text-sm md:text-lg">
      {features.map((feature: string) => {
        if (breed[feature] > 0) {
          return (
            <li
              key={feature}
              className="bg-red-500 text-white px-2 py-1 rounded-xl font-bold"
            >
              {feature.replace('_', ' ')}
            </li>
          );
        }
      })}
    </ul>
  </aside>
  <div className="lg:max-w-[50%]">
    {data.map((item: any) => (
      <Image
        key={item.id}
        src={item.url}
        alt={breed.name || ""}
        width={0}
        height={0}
        placeholder="blur"
        blurDataURL={"/images/cat.jpg"}
        sizes="100vw"
        className="mt-3 w-full h-[400px] object-cover rounded-md"
      />
    ))}
  </div>
</article>




        </Wrapper>
    );
}
