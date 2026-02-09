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

        public MainForm() : this(new ApiClient("http://localhost:3000"))
        {
        }

        public MainForm(ApiClient api)
        {
            InitializeComponent();
            _api = api;
        }

        private async void btnLoadFilmek_Click(object sender, EventArgs e)
        {
            try
            {
                var filmek = await _api.GetAsync<List<FilmDto>>("/filmek/");
                dgvFilmek.AutoGenerateColumns = true;
                dgvFilmek.DataSource = filmek;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Filmek betöltése hiba: " + ex.Message);
            }
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

    }

}
