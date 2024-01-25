export interface mmpData {
  id: number;
  zitat_stelle: string;
  zitat: string;
  display_label: string;
  key_word: KeywordItem[];
  start_date: string | null;
  end_date: string | null;
  text: {
    autor: AuthorData[];
    title: string;
    start_date: string;
    end_date: string;
  }
}

export interface KeywordItem {
  id: number;
  stichwort: string;
  varianten: string;
  wurzel: string;
}

export interface AuthorData {
  id: number;
  name: string | null;
}

export interface mmpDetailData {
  id: number;
  summary: string;
  zitat: string;
  zitat_stelle: string;
  start_date: number | null;
  end_date: number | null;
  kommentar: string;
  display_label: string;
  text: {
    id: number;
    legacy_id: string;
    legacy_pk: string;
    title: string;
    text_lang: string;
    start_date: string;
    end_date: string;
    not_before: number | null;
    not_after: number | null;
    edition: string;
    kommentar: string;
  }
  autor: DetailAutorData[];
  ort: DetailOrtData[];
  key_word: DetailKeyWordData[];
}

export interface DetailAutorData {
  id: number;
  legacy_id: string | null;
  legacy_pk: string | null;
  name: string;
  start_date: string;
  end_date: string;
  kommentar: string;
  ort: number | null
}

export interface DetailOrtData{
  id: number;
  legacy_id: string | null;
  legacy_pk: number | null;
  name: string;
  name_antik: string;
  name_de: string;
  name_fr: string;
  name_it: string;
  name_gr: string;
  long: number;
  lat: number;
  coords: {
    type: string;
    coordinates: number[];
  }
}

export interface DetailKeyWordData {
  id: number;
  legacy_id: string | null;
  legacy_pk: number | null;
  stichwort: string;
  art: string;
  varianten: string;
  wurzel: string;
  kommentar: string | null;
}

export interface PagnationObject {
    searchTerm: string;
    searchLimit: string | number;
    storedLimit: string | number;
    shownLimit: string | number;
    offset: string | number;
}

export interface PagnationObjectPart2 {
    searchTerm: string;
    searchLimit: string | number;
    storedLimit: string | number;
    shownLimit: string | number;
    offset: string | number;
    resultPerPage: string | number;
}