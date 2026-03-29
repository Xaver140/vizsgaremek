using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace asztali
{
    public partial class MainForm : Form
    {
        private readonly ApiClient _api;

        string cs = "server=localhost;uid=root;database=mozi_adat;port=3306;pwd=;";

        public MainForm() : this(new ApiClient("http://localhost:3000"))
        {
        }

        public MainForm(ApiClient api)
        {
            InitializeComponent();
            _api = api;
        }

        private void btnLoadFilmek_Click(object sender, EventArgs e)
        {

        }
        private void btnBack_Click(object sender, EventArgs e)
        {
            this.Hide();  // NEM Close!

            var login = new LoginForm();

            // ha a login bezáródik, a main visszajön
            login.FormClosed += (s, args) =>
            {
                this.Show();
            };

            login.Show();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide();

            using (var f = new DatabaseForm())
            {
                f.ShowDialog();
            }

            this.Show();
        }

        private void btnLoadFilmek_Click_1(object sender, EventArgs e)
        {
            try
            {
                listBoxFilmek.Items.Clear();

                using (MySqlConnection conn = new MySqlConnection(cs))
                {
                    conn.Open();

                    string sql = "SELECT title, duration_minutes, release_year, genre FROM filmek WHERE is_active = 1";
                    MySqlCommand cmd = new MySqlCommand(sql, conn);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            string title = reader["title"].ToString();
                            string duration = reader["duration_minutes"].ToString();
                            string release = reader["release_year"].ToString();
                            string genre = reader["genre"].ToString();

                            listBoxFilmek.Items.Add($"{title} | {duration} perc | {release} | {genre}");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Filmek betöltése hiba: " + ex.ToString());
            }
        }

        private void MainForm_Load(object sender, EventArgs e)
        {

        }

        private void btnFilmEditor_Click(object sender, EventArgs e)
        {
            this.Hide();

            using (var f = new FilmEditorForm())
            {
                f.ShowDialog();
            }

            this.Show();
        }
    }

}
