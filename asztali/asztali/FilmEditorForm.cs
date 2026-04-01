using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data.MySqlClient;
using System.IO;

namespace asztali
{
    public partial class FilmEditorForm : Form
    {
        private int? selectedFilmId = null;
        string cs = "server=localhost;uid=root;database=mozi_adat;port=3307;pwd=;";
        public FilmEditorForm()
        {
            InitializeComponent();

            cmbGenre.Items.Add("Fantasy");
            cmbGenre.Items.Add("Dráma");
            cmbGenre.Items.Add("Sci-Fi");
            cmbGenre.Items.Add("Romantikus");
            cmbGenre.Items.Add("Akció");
            cmbGenre.Items.Add("Vígjáték");
            cmbGenre.Items.Add("Thriller");
            cmbGenre.Items.Add("Horror");
        }

        private void btnLoadFilms_Click(object sender, EventArgs e)
        {
            try
            {
                listBoxFilmek.Items.Clear();

                using (MySqlConnection conn = new MySqlConnection(cs))
                {
                    conn.Open();

                    string sql = "SELECT film_id, title FROM filmek ORDER BY title";
                    MySqlCommand cmd = new MySqlCommand(sql, conn);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            listBoxFilmek.Items.Add(reader["film_id"].ToString() + ";" + reader["title"].ToString());
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Filmek betöltése hiba: " + ex.Message);
            }
        }

        private void FilmEditorForm_Load(object sender, EventArgs e)
        {
            cmbGenre.Items.Clear();
            cmbGenre.Items.Add("Fantasy");
            cmbGenre.Items.Add("Dráma");
            cmbGenre.Items.Add("Sci-Fi");
            cmbGenre.Items.Add("Romantikus");
            cmbGenre.Items.Add("Akció");
            cmbGenre.Items.Add("Vígjáték");
            cmbGenre.Items.Add("Thriller");
            cmbGenre.Items.Add("Horror");

            ClearForm();
        }
        private void ClearForm()
        {
            selectedFilmId = null;

            txtTitle.Text = "";
            txtDescription.Text = "";
            txtDuration.Text = "";
            txtReleaseYear.Text = "";
            cmbGenre.SelectedIndex = -1;

            chkActive.Checked = false;

            listBoxFilmek.ClearSelected();
        }
        private void LoadFilms()
        {
            try
            {
                listBoxFilmek.Items.Clear();

                using (MySqlConnection conn = new MySqlConnection(cs))
                {
                    conn.Open();

                    string sql = "SELECT film_id, title FROM filmek ORDER BY title";
                    MySqlCommand cmd = new MySqlCommand(sql, conn);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            listBoxFilmek.Items.Add(reader["film_id"].ToString() + ";" + reader["title"].ToString());
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Filmek betöltése hiba: " + ex.Message);
            }
        }
        private void listBoxFilmek_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (listBoxFilmek.SelectedItem == null)
                return;

            string[] parts = listBoxFilmek.SelectedItem.ToString().Split(';');
            int filmId = int.Parse(parts[0]);

            try
            {
                using (MySqlConnection conn = new MySqlConnection(cs))
                {
                    conn.Open();

                    string sql = @"SELECT film_id, title, description, duration_minutes, release_year, genre, is_active
                           FROM filmek
                           WHERE film_id = @id";

                    MySqlCommand cmd = new MySqlCommand(sql, conn);
                    cmd.Parameters.AddWithValue("@id", filmId);

                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            selectedFilmId = Convert.ToInt32(reader["film_id"]);
                            txtTitle.Text = reader["title"].ToString();
                            txtDescription.Text = reader["description"].ToString();
                            txtDuration.Text = reader["duration_minutes"].ToString();
                            txtReleaseYear.Text = reader["release_year"].ToString();
                            cmbGenre.Text = reader["genre"].ToString();

                            int active = Convert.ToInt32(reader["is_active"]);
                            chkActive.Checked = (active == 1);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Film betöltése hiba: " + ex.Message);
            }
        }
        private bool HasColumn(MySqlDataReader reader, string columnName)
        {
            for (int i = 0; i < reader.FieldCount; i++)
            {
                if (reader.GetName(i).Equals(columnName, StringComparison.OrdinalIgnoreCase))
                    return true;
            }
            return false;
        }
        private void btnNew_Click(object sender, EventArgs e)
        {
            ClearForm();
        }
        private void btnSave_Click(object sender, EventArgs e)
        {
            try
            {
                int duration;
                int releaseYear;

                if (string.IsNullOrWhiteSpace(txtTitle.Text))
                {
                    MessageBox.Show("A film címe kötelező!");
                    return;
                }

                if (!int.TryParse(txtDuration.Text, out duration))
                {
                    MessageBox.Show("A játékidő szám legyen!");
                    return;
                }

                if (!int.TryParse(txtReleaseYear.Text, out releaseYear))
                {
                    MessageBox.Show("A megjelenési év szám legyen!");
                    return;
                }

                int isActive = chkActive.Checked ? 1 : 0;

                using (MySqlConnection conn = new MySqlConnection(cs))
                {
                    conn.Open();

                    MySqlCommand cmd;

                    if (selectedFilmId == null)
                    {
                        string insertSql = @"
                    INSERT INTO filmek(title, description, duration_minutes, release_year, genre, is_active)
                    VALUES(@title, @description, @duration, @release, @genre, @active)";

                        cmd = new MySqlCommand(insertSql, conn);
                    }
                    else
                    {
                        string updateSql = @"
                    UPDATE filmek
                    SET title = @title,
                        description = @description,
                        duration_minutes = @duration,
                        release_year = @release,
                        genre = @genre,
                        is_active = @active
                    WHERE film_id = @id";

                        cmd = new MySqlCommand(updateSql, conn);
                        cmd.Parameters.AddWithValue("@id", selectedFilmId.Value);
                    }

                    cmd.Parameters.AddWithValue("@title", txtTitle.Text.Trim());
                    cmd.Parameters.AddWithValue("@description", txtDescription.Text.Trim());
                    cmd.Parameters.AddWithValue("@duration", duration);
                    cmd.Parameters.AddWithValue("@release", releaseYear);
                    cmd.Parameters.AddWithValue("@genre", cmbGenre.Text);
                    cmd.Parameters.AddWithValue("@active", isActive);

                    cmd.ExecuteNonQuery();
                }

                MessageBox.Show("Mentés sikeres!");
                ClearForm();
                btnLoadFilms_Click(null, null);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Mentési hiba: " + ex.Message);
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (selectedFilmId == null)
            {
                MessageBox.Show("Nincs kiválasztott film!");
                return;
            }

            var ok = MessageBox.Show("Biztosan törlöd ezt a filmet?", "Törlés", MessageBoxButtons.YesNo);
            if (ok != DialogResult.Yes) return;

            try
            {
                using (MySqlConnection conn = new MySqlConnection(cs))
                {
                    conn.Open();

                    string sql = "DELETE FROM filmek WHERE film_id = @id";
                    MySqlCommand cmd = new MySqlCommand(sql, conn);
                    cmd.Parameters.AddWithValue("@id", selectedFilmId.Value);

                    int rows = cmd.ExecuteNonQuery();
                    MessageBox.Show("Törölt sorok: " + rows);
                }

                ClearForm();
                LoadFilms();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Törlés hiba: " + ex.Message);
            }
        }
        private void btnBack_Click(object sender, EventArgs e)
        {
            this.Close();
        }


    }
}
