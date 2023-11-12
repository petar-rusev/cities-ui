interface SortParameters {
    sortItem: {
      getKey: () => string;
    };
    sortDescending: boolean;
  }