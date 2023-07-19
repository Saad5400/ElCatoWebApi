namespace ElCatoWebApi.Models.OldModels.ViewModels
{
    public class AdminIndexVM
    {
        public List<Page> Pages { get; set; }
        public List<Card> Cards { get; set; }
        public List<CardListItem> CardList { get; set; }
        public List<HomeAlert> HomeAlerts { get; set; }

        public Page NewPage { get; set; }
        public Card NewCard { get; set; }
        public CardListItem NewCardListItem { get; set; }

        public HomeAlert NewHomeAlert { get; set; }
    }
}
