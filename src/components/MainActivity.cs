using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Util;
using Android.Views;
using Android.Webkit;
using Android.Widget;
using GuessTheDefinition.Models;
using Xamarin.Essentials;


namespace GuessTheDefinition
{
    [Activity(Label = "Guess The Definition", MainLauncher = true, Icon = "@drawable/DictionaryIcon")]
    //Note how I used the Theme for the custom theme  , Theme = "@style/Theme.Custom"
    public class MainActivity : Activity
    {
        private int count = 0;
        List<string> DictList = new List<string>();
        Dictionary<string, string> DictOxford = new Dictionary<string, string>();
        //  Words myWords = new Words();
        private string tag = "aaaaa";

        private RadioButton RB1;
        private RadioButton RB2;
        private RadioButton RB3;
        private RadioButton RB4;
        private Button btnPlay;
        private TextView Word;
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            //https://docs.microsoft.com/en-us/xamarin/essentials/get-started?tabs=windows%2Candroid
            Xamarin.Essentials.Platform.Init(this, bundle); // add this line to your code, it may also be called: bundle
            //...
            Log.Info(tag, "Started to generate tag");
            Initialize();
            LoadDic();
            // CopyTheDB();


        }
        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Android.Content.PM.Permission[] grantResults)
        {
            //https://docs.microsoft.com/en-us/xamarin/essentials/get-started?tabs=windows%2Candroid
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
        }


        private void Initialize()
        {
            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.Main);
            btnPlay = FindViewById<Button>(Resource.Id.MyButton);
            RB1 = FindViewById<RadioButton>(Resource.Id.RB1);
            RB2 = FindViewById<RadioButton>(Resource.Id.RB2);
            RB3 = FindViewById<RadioButton>(Resource.Id.RB3);
            RB4 = FindViewById<RadioButton>(Resource.Id.RB4);
            Word = FindViewById<TextView>(Resource.Id.Word);

            //   var menu = FindViewById<SatelliteMenuButton>(Resource.Id.menu);

            btnPlay.Click += btnClick;
            //All the radiobuttons go to the same click event
            RB1.Click += RadioButtonClick;
            RB2.Click += RadioButtonClick;
            RB3.Click += RadioButtonClick;
            RB4.Click += RadioButtonClick;





        }



        private void btnClick(object sender, EventArgs e)
        {
            Log.Info(tag, "Click run");
            ButtonClickStuff();
        }

        //Button click stuff is called elsewhere as well so had to be under its own method, as it should anyway.
        private void ButtonClickStuff()
        {
            Log.Info(tag, "ButtonClickStuff");
            RB1.Checked = false;
            RB2.Checked = false;
            RB3.Checked = false;
            RB4.Checked = false;

            GenerateQuestion();
        }

        /// <summary>
        /// Radio button click event
        /// </summary>
        private void RadioButtonClick(object sender, EventArgs e)
        {
            //create a fake RB
            RadioButton rb = (RadioButton)sender;
            //correct answer
            if (rb.Text == Words.Answer)
            {
                Toast.MakeText(this, "Correct", ToastLength.Long).Show();
                ButtonClickStuff(); //load the next question
                count++; //add up the correct answers
                Words.Score = count;
                btnPlay.Text = count.ToString() + " Correct"; //show it on the button
                return;
            }

            Toast.MakeText(this, "Wrong, it is " + Words.Answer, ToastLength.Long).Show();
            btnPlay.Text = "Play Again";

            // string[] Data = { Words.Word, count.ToString() };
            Lose();

            count = 0; //reset count to 0
        }

        public void LoadDic()
        {
            //need to tie the asset manager to these assets in this project This method can only run under the activity as it doesn't know what Assets is otherwise, this.Assets doesn't work. 
            try
            {
                var assets = Assets;
                using (var sr = new StreamReader(assets.Open("OxfordJson.json")))
                {
                    while (!sr.EndOfStream)
                    {
                        var text = sr.ReadLine();
                                          }
                }
             
            }
            catch (Exception)
            {

                Toast.MakeText(this, "Dictionary didn't load", ToastLength.Short).Show();
            }
        }
        private void GenerateQuestion()
        {
            Log.Info(tag, "GenerateQuestion");
            Random rand = new Random();
            //dictionary doesn't contain an Index [] place so use the list to get a random word, then stick the word in the dictionary to get the defn.

            int RndNumber = rand.Next(1, DictOxford.Count);
            //its too random, lets get the word after the selected word (NextWord) and the word before (PrevWord)
            Log.Info(tag, "RndNumber " + RndNumber);

            Words.Word = DictList[RndNumber];
            Log.Info(tag, "Myword = " + Words.Word);

            // myWords.AllWords.Add(myWords.Word);
            Words.NextWord = DictList[RndNumber + 1];
            Words.Answer = DictOxford[Words.Word];
            Words.NextAnswer = DictOxford[Words.NextWord];
            Words.PrevWord = DictList[RndNumber - 1];
            Words.PrevAnswer = DictOxford[Words.PrevWord];
            // button.Text = myWords.Word;
            Word.Text = Words.Word;

            int[] Numbers = Operations.ShuffleRndNumbers(); //lets shuffle some numbers!

            //make 4 answers then pass them to an array
            SetAnswer(Words.NextAnswer, Numbers[0]);
            SetAnswer(Words.PrevAnswer, Numbers[1]);
            SetAnswer(Words.Answer, Numbers[2]);
            SetAnswer(RndDictEntry(), Numbers[3]);
        }

        private void SetAnswer(string Answer, int position)
        {
            //create an array and then shudffle it.

            Log.Info(tag, "Set answer " + Answer);

            //   Random rand = new Random();
            //   int rnd = rand.Next(1, 5);
            //put the answer in the random radiobutton text
            switch (position)
            {
                case 1:

                    RB1.Text = Answer;
                    break;
                case 2:

                    RB2.Text = Answer;
                    break;
                case 3:

                    RB3.Text = Answer;
                    break;
                case 4:

                    RB4.Text = Answer;
                    break;
            }
        }




        private string RndDictEntry()
        { //generate a random answer
          // Thread.Sleep(20);
            int Seed = (int)DateTime.Now.Ticks;
            Random rand = new Random(Seed);
            //dictionary doesn't contain a [] place so use the list to get a random word, then stick the word in the dictionary to get the defn.

            string word = DictList[rand.Next(1, DictOxford.Count)];
            return DictOxford[word];
        }

        private void Lose()
        {

            Log.Info(tag, "Lose run");
            if (Words.Score > 1) // come on get at least 2 correct
            {
                StartActivity(typeof(AddItem));
                Finish();
            }
            else
            {
                Toast.MakeText(this, "You have to do better than " + Words.Score + " to join the roll of the Awesome", ToastLength.Long).Show();
            }
        }


        //Adds Add to the Menu in the top right of your screen.
        //https://developer.xamarin.com/api/type/Android.Views.IMenu/
        //https://developer.xamarin.com/samples/mobile/StandardControls/
        public override bool OnCreateOptionsMenu(IMenu menu)
        {
            menu.Add("All Scores");
            menu.Add("Play a Game");
            menu.Add("Add New Score");
            menu.Add("I'm bored");
            menu.Add("Open A Browser");
            return base.OnPrepareOptionsMenu(menu);
        }
        //When you choose Add from the Menu run the Add Activity
        public override bool OnOptionsItemSelected(IMenuItem item)
        {
            var itemTitle = item.TitleFormatted.ToString();

            switch (itemTitle)
            {

                case "All Scores":
                    StartActivity(typeof(Scores));
                    break;
                case "Play a Game":
                    StartActivity(typeof(MainActivity));
                    break;
                case "Add New Score":
                    count = 0; //don't keep the old score.
                    StartActivity(typeof(AddItem));
                    Finish();
                    break;
                case "I'm bored":
                    StartActivity(typeof(Web));
                    break;
                case "Open A Browser":
                    //https://developer.xamarin.com/recipes/android/fundamentals/intent/open_a_webpage_in_the_browser_application/

                    var uri = Android.Net.Uri.Parse("https://news.google.com/");
                    var intent = new Intent(Intent.ActionView, uri);
                    StartActivity(intent);
                    break;
            }
            return base.OnOptionsItemSelected(item);
        }

    }

}