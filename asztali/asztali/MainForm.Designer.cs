namespace asztali
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            btnLoadFilmek = new Button();
            label1 = new Label();
            btnBack = new Button();
            Adatbázis = new Button();
            listBoxFilmek = new ListBox();
            SuspendLayout();
            // 
            // btnLoadFilmek
            // 
            btnLoadFilmek.Location = new Point(424, 20);
            btnLoadFilmek.Name = "btnLoadFilmek";
            btnLoadFilmek.Size = new Size(180, 147);
            btnLoadFilmek.TabIndex = 1;
            btnLoadFilmek.Text = "Filmek betöltése";
            btnLoadFilmek.UseVisualStyleBackColor = true;
            btnLoadFilmek.Click += btnLoadFilmek_Click_1;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(412, 386);
            label1.Name = "label1";
            label1.Size = new Size(62, 15);
            label1.TabIndex = 2;
            label1.Text = "MainForm";
            // 
            // btnBack
            // 
            btnBack.Location = new Point(39, 281);
            btnBack.Name = "btnBack";
            btnBack.Size = new Size(207, 122);
            btnBack.TabIndex = 3;
            btnBack.Text = "Bejelentkezés";
            btnBack.UseVisualStyleBackColor = true;
            btnBack.Click += btnBack_Click;
            // 
            // Adatbázis
            // 
            Adatbázis.Location = new Point(624, 285);
            Adatbázis.Name = "Adatbázis";
            Adatbázis.Size = new Size(143, 118);
            Adatbázis.TabIndex = 4;
            Adatbázis.Text = "Adatbázis";
            Adatbázis.UseVisualStyleBackColor = true;
            Adatbázis.Click += button1_Click;
            // 
            // listBoxFilmek
            // 
            listBoxFilmek.FormattingEnabled = true;
            listBoxFilmek.ItemHeight = 15;
            listBoxFilmek.Location = new Point(12, 20);
            listBoxFilmek.Name = "listBoxFilmek";
            listBoxFilmek.Size = new Size(406, 244);
            listBoxFilmek.TabIndex = 5;
            // 
            // MainForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(listBoxFilmek);
            Controls.Add(Adatbázis);
            Controls.Add(btnBack);
            Controls.Add(label1);
            Controls.Add(btnLoadFilmek);
            Name = "MainForm";
            Text = "Main Form";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion
        private Button btnLoadFilmek;
        private Label label1;
        private Button btnBack;
        private Button Adatbázis;
        private ListBox listBoxFilmek;
    }
}