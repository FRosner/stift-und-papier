import {GameComponent} from '@src/app/components/game/game.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Player} from '@src/app/models/player';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const player = new Player(0, 'test', 'blue');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render ownerless edges grey', () => {
    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    expect(edge.attributes['stroke']).toEqual('#ccc');
  });

  it('should change the owner of an edge on click', () => {
    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    edge.triggerEventHandler('click', null);
    expect(component.graph.edges.find(e => e.owner === component.player))
        .toBeTruthy();
  });

  it('should render player edges with the respective color', () => {
    component.graph.edges[0].owner = player;
    fixture.detectChanges();

    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    expect(edge.attributes['stroke']).toEqual(player.color);
  });

  it('should render ownerless squares with the respective color', () => {
    const edge = fixture.debugElement.query(By.css('#square-0-0'));
    expect(edge.attributes['fill']).toEqual('#ccc');
  });

  it('should render player squares with the respective color', () => {
    const edge = fixture.debugElement.query(By.css('#square-0-0'));
    component.squares[0].owner = player;
    fixture.detectChanges();
    expect(edge.attributes['fill']).toEqual(player.color);
  });

  it('should render the score', () => {
    const score = fixture.debugElement.query(By.css('#score-0'));
    component.scoreBoard[player.id] = 5;
    fixture.detectChanges();
    expect(score.nativeElement.textContent.trim()).toEqual('5');
  });

  it('should change the owner of all squares and update the scoreafter closing a section', () => {
    drawEdge(player, 0, 0, 1, 0);
    drawEdge(player, 1, 0, 1, 1);
    drawEdge(player, 0, 1, 1, 1);
    drawEdge(player, 0, 0, 0, 1);
    expect(component.squares[0].owner).toEqual(player);
    expect(component.scoreBoard[player.id]).toEqual(1);
  });

  it('should not change the owner squares that already have an owner', () => {
    // TODO but needs multiplayer capabilities
  });

  function drawEdge(p: Player, x1: number, y1: number, x2: number, y2: number) {
    component.drawEdge(
        component.graph.edges.find(e =>
            e.source.x === x1 && e.source.y === y1 && e.target.x === x2 && e.target.y === y2,
        ),
        p,
    );
  }
});
