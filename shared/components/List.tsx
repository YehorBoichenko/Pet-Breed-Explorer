'use client'

import React from "react"
import Link from "next/link";
import {Card} from "./Card";
import { useSearch } from "@/shared/store/store";
import { filteredCards } from "../utils/filteredCards";

interface Props {
  className?: string;
  items: any[];
}




export const List: React.FC<Props> = ({ items }) => {

    const { searchTerm } = useSearch((state) => state);
    const filteredBreeds = filteredCards(items, searchTerm);
    return (
        <div className="grid px-4 md:px-4 lg:px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden block relative">
            {filteredBreeds.map((item: any, i: number) => (
        <Link
          key={item.id}
          href={
            item.breeds[0].dog_friendly
              ? "/cats/" + item.breeds[0].id
              : "/dogs/" + item.breeds[0].id
          }
        >
          <Card
            isDog={item.breeds[0].dog_friendly ? false : true}
            title={item.breeds[0].name}
                  imageUrl={item.url}
                           name={item.breeds[0].name}
            temperament={item.breeds[0].temperament}
            origin={item.breeds[0].origin}
          />
        </Link>
      ))}

        </div>
    )
}