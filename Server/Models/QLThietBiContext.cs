using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Server.Models;

public partial class QLThietBiContext : DbContext
{
    public QLThietBiContext()
    {
    }

    public QLThietBiContext(DbContextOptions<QLThietBiContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ThietBiCntt> ThietBiCntts { get; set; }

//     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//         => optionsBuilder.UseSqlServer("Server=PCNTT-HPDQ34864\\DAT2025;Database=QLThietBi;User Id=sa;Password=Ronaldat@2026;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ThietBiCntt>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ThietBiC__3214EC07C94B2A4B");

            entity.ToTable("ThietBiCNTT");

            entity.Property(e => e.DonViSuDung).HasMaxLength(200);
            entity.Property(e => e.LoaiThietBi).HasMaxLength(100);
            entity.Property(e => e.NgayNhap).HasColumnType("datetime");
            entity.Property(e => e.NguoiQuanLy).HasMaxLength(100);
            entity.Property(e => e.SerialNumber).HasMaxLength(100);
            entity.Property(e => e.ServiceTag).HasMaxLength(100);
            entity.Property(e => e.TenThietBi).HasMaxLength(200);
            entity.Property(e => e.TrangThai).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
