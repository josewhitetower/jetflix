export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int']['output'];
  movies: Array<Movie>;
  name: Scalars['String']['output'];
  page: Scalars['Int']['output'];
  total_pages: Scalars['String']['output'];
};

export type Movie = {
  __typename?: 'Movie';
  cast: Array<Person>;
  genre_ids: Array<Genre>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  homepage: Scalars['String']['output'];
  id: Scalars['String']['output'];
  original_language: Scalars['String']['output'];
  overview: Scalars['String']['output'];
  poster_path: Scalars['String']['output'];
  release_date: Scalars['String']['output'];
  runtime: Scalars['String']['output'];
  tagline: Scalars['String']['output'];
  title: Scalars['String']['output'];
  trailer?: Maybe<Scalars['String']['output']>;
  vote_average: Scalars['Float']['output'];
};

export type Person = {
  __typename?: 'Person';
  cast_id: Scalars['String']['output'];
  character: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  profile_path: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  movie?: Maybe<Movie>;
  trending: Array<Movie>;
};


export type QueryMovieArgs = {
  id: Scalars['Int']['input'];
};

export type Search = {
  __typename?: 'Search';
  page: Scalars['Int']['output'];
  results: Array<Maybe<Movie>>;
  total_pages: Scalars['Int']['output'];
};
