import { getDogBreed } from "@/shared/api/getBreeds";
import { Wrapper } from "@/shared/components/Wrapper";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const data = await fetch(
    `https://api.thedogapi.com/v1/images/search?breed_ids=` + id,
    {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_DOGS_API_KEY as string,
      },
    }
  ).then((res) => res.json());

  return {
    title: data[0].breeds[0].name,
  };
}

export default async function DogBreedpage({ params }: { params: { id: string } }) {
    const data = await getDogBreed(params.id);
    return (
      <Wrapper className="px-4 md:px-4 lg:px-4">
<article className='mb-2 flex flex-col items-center w-full lg:px-5 lg:mb-5 lg:flex-col xl:flex-row-reverse xl:items-start'>
  <aside className='w-full px-2 pt-5 flex flex-col gap-2 lg:px-0 lg:max-w-[50%] lg:mx-0 lg:pl-10 lg:pt-10 lg:sticky lg:top-0'>
    <div className='flex gap-2 flex-col justify-between sm:flex-row sm:items-center'>
      <h1 className='text-3xl md:text-5xl font-bold'>
        {data[0].breeds[0].name}
      </h1>
      {data[0].breeds[0].origin && (
        <span className='w-fit py-1 px-2 bg-indigo-500 text-white rounded-2xl text-sm text-center md:text-md'>
          {data[0].breeds[0].origin}
        </span>
      )}
    </div>

    <p className='text-lg md:text-xl'>
      {data[0].breeds[0].temperament}
    </p>

    <ul className='text-lg md:text-xl flex flex-col gap-2'>
      <li className='text-lg md:text-xl'>
        <b>Life span:</b> {data[0].breeds[0].life_span} years
      </li>
      <li>
        <b>Bred for:</b> {data[0].breeds[0].bred_for}
      </li>
      <li>
        <b>Breed group:</b> {data[0].breeds[0].breed_group}
      </li>
      <li>
        <b>Weight:</b> {data[0].breeds[0].weight.metric} kg
      </li>
      <li>
        <b>Height:</b> {data[0].breeds[0].height.metric} cm
      </li>
    </ul>
  </aside>

  <div className='w-full max-w-full flex flex-col items-center lg:max-w-[50%]'>
    {data.map((item: any) => (
      <Image
        key={item.id}
        src={item.url}
        alt={item.breeds[0].name || ""}
        width={0}
        height={0}
        placeholder="blur"
        blurDataURL={"/images/doggie.jpg"}
        sizes="100vw"
        className="mt-3 w-full h-[400px] object-cover rounded-md"
      />
    ))}
  </div>
</article>



        </Wrapper>
    )
}